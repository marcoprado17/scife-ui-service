import React, {Component} from 'react'
import {
  Segment,
  Card,
  Button,
  Divider,
  Message
} from 'semantic-ui-react'
import DesktopContainer from "../../components/DesktopContainer"
let smartCarInsuranceFactoryContract = null;
let SmartCarInsuranceContract = null;
let web3 = null;

class ParticipateButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
  }

  handleClick = async (event) => {
    this.setState({loading: true, successMessage: "", errorMessage: ""});

    const accounts = await web3.eth.getAccounts();

    console.log(this.props.txValue);

    this.props.smartCarInsuranceContract.methods.enterContract().send({
      from: accounts[0],
      value: this.props.txValue
    })
      .once("receipt", (receipt) => {
        this.setState({successMessage: "Participação efetuada com sucesso"});
      })
      .on("error", (err) => {
        this.setState({errorMessage: err.message});
      })
      .finally( () => {
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <div>
        {
          this.state.successMessage &&
          <Message success style={{marginTop: "12px"}}>
            <Message.Header>{this.state.successMessage}</Message.Header>
          </Message>
        }
        {
          this.state.errorMessage &&
          <Message negative style={{marginTop: "12px"}}>
            <Message.Header>Falha ao tentar participar do contrato!</Message.Header>
            {this.state.errorMessage}
          </Message>
        }
        <div style={{textAlign: 'right'}}>
          <Button type='submit' loading={this.state.loading} onClick={this.handleClick}>Participar</Button>
        </div>
      </div>
    );
  }
}

class CreateNewComponent extends Component {
  static async getInitialProps({pathname}) {
    return {
      pathname
    }
  }

  constructor(props){
    super(props);
    this.state = {}
  }

  async componentDidMount(){
    web3 = require('../../../ethereum/web3').default;
    smartCarInsuranceFactoryContract = require('../../../ethereum/smart_car_insurance_factory_contract').default;
    SmartCarInsuranceContract = require('../../../ethereum/smart_car_insurance_contract').default;

    let contracts = []

    let deployedContractsAddresses = await smartCarInsuranceFactoryContract.methods.getDeployedContracts().call();
    deployedContractsAddresses.map(async deployedContractAddress => {
      let smartCarInsuranceContract = SmartCarInsuranceContract(deployedContractAddress);
      let detailsPromise = smartCarInsuranceContract.methods.details().call();
      let balancePromise = web3.eth.getBalance(deployedContractAddress);
      let [details, balance] = await Promise.all([detailsPromise, balancePromise]);
      contracts.push({
        address: deployedContractAddress,
        balance: balance,
        details: details,
        smartCarInsuranceContract: smartCarInsuranceContract
      });
      this.setState({contracts});
    });
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em'}} vertical>
            { this.state.contracts &&
              this.state.contracts.map(function(contract){
              return (
                <Card style={{width: '600px', marginLeft: 'auto', marginRight: 'auto'}} key={contract.address}>
                  <Card.Content>
                    <Card.Header style={{marginTop: '8px'}}>{contract.details.name}</Card.Header>
                    <Card.Meta>{contract.address}</Card.Meta>
                    <Divider/>
                    <b>Criador: </b>{contract.details.creatorId}<br/>
                    <b>Contribuição inicial: </b>{web3.utils.fromWei(contract.details.initialContribution)} eth<br/>
                    <b>Reembolso: </b>{web3.utils.fromWei(contract.details.refundValue)} eth<br/>
                    <b>Caixa do contrato: </b>{web3.utils.fromWei(contract.balance)} eth<br/>
                    <b>Número de participantes: </b>{contract.details.nParticipants}/{contract.details.nMaxParticipants}<br/>
                    <b>Percentagem mínima de votos para liberar reembolso: </b>{contract.details.minVotePercentageToRefund} %<br/>
                    <ParticipateButton smartCarInsuranceContract={contract.smartCarInsuranceContract} txValue={contract.details.initialContribution}></ParticipateButton>
                  </Card.Content>
                </Card>
              )
            })}
        </Segment>
      </DesktopContainer>
    )
  }
}

export default CreateNewComponent;
