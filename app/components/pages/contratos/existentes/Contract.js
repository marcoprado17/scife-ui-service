import React, {Component} from 'react'
import {
  Card,
  Button,
  Divider,
  Message
} from 'semantic-ui-react'
let web3;
let SmartCarInsuranceContract;
const browserImports = () => {
  web3 = require('../../../../../ethereum/web3').default;
  SmartCarInsuranceContract = require('../../../../../ethereum/SmartCarInsuranceContract').default;
}

export default class Contract extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
    this.browserDependenciesImported = false;
  }

  async componentDidMount(){
    if(!this.browserDependenciesImported) {
      browserImports();
      this.smartCarInsuranceContract = SmartCarInsuranceContract(this.props.address);
      this.browserDependenciesImported = true;
    }

    let detailsPromise = this.smartCarInsuranceContract.methods.details().call();
    let balancePromise = web3.eth.getBalance(this.props.address);
    let accountsPromise =  web3.eth.getAccounts();
    let [details, balance, accounts] = await Promise.all([detailsPromise, balancePromise, accountsPromise]);

    this.setState({
      details,
      balance,
      account: accounts[0],
      dataFetched: true
    });
  }

  onClick = async () => {
    this.setState({loading: true, successMessage: '', errorMessage: ''});

    try {
      await this.smartCarInsuranceContract.methods.enterContract().send({
        from: this.state.account,
        value: this.state.details.initialContribution
      });
      this.setState({successMessage: 'Participação efetuada com sucesso', loading: false});
    }
    catch(err){
      this.setState({errorMessage: err.message, loading: false});
    }
  }

  render() {
    if(this.state.dataFetched) {
      return (
        <Card style={{ width: '600px', marginLeft: 'auto', marginRight: 'auto' }} key={this.props.address}>
          <Card.Content>
            <Card.Header style={{ marginTop: '8px' }}>{this.state.details.name}</Card.Header>
            <Card.Meta>{this.props.address}</Card.Meta>
            <Divider />
            <b>Criador: </b>{this.state.details.creatorId}<br />
            <b>Contribuição inicial: </b>{web3.utils.fromWei(this.state.details.initialContribution.toString())} eth<br />
            <b>Reembolso: </b>{web3.utils.fromWei(this.state.details.refundValue.toString())} eth<br />
            <b>Caixa do contrato: </b>{web3.utils.fromWei(this.state.balance.toString())} eth<br />
            <b>Número de participantes: </b>{this.state.details.nParticipants}/{this.state.details.nMaxParticipants}<br />
            <b>Percentagem mínima de votos para liberar reembolso: </b>{this.state.details.minVotePercentageToRefund}%<br />
            {
              this.state.successMessage &&
              <Message positive style={{marginTop: '12px'}}>
                <Message.Header>{this.state.successMessage}</Message.Header>
              </Message>
            }
            {
              this.state.errorMessage &&
              <Message negative style={{marginTop: '12px'}}>
                <Message.Header>Falha ao tentar participar do contrato!</Message.Header>
                {this.state.errorMessage}
              </Message>
            }
            <div style={{textAlign: 'right'}}>
              <Button type='submit' loading={this.state.loading} onClick={this.onClick}>Participar</Button>
            </div>
          </Card.Content>
        </Card>
      )
    }
    else {
      return null;
    }
  }
}
