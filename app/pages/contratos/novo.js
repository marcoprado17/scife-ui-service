import React, {Component} from 'react'
import {
  Segment,
  Form,
  Button,
  Input,
  Label,
  Card,
  Message
} from 'semantic-ui-react'
import DesktopContainer from "../../components/DesktopContainer"
let smartCarInsuranceFactoryContract = null;
let web3 = null; 

class CreateNewComponent extends Component {
  static async getInitialProps({pathname}) {
    return {pathname}
  }
  
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      showSuccessMessage: false,
      errorMessage: ''
    }
  }

  componentDidMount(){
    smartCarInsuranceFactoryContract = require('../../../ethereum/smart_car_insurance_factory_contract').default;
    web3 = require('../../../ethereum/web3').default;
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '', showSuccessMessage: false});

    try {
      const accounts = await web3.eth.getAccounts();
      await smartCarInsuranceFactoryContract.methods
        .createSmartCarInsuranceContract(
          this.state.contractName,
          web3.utils.toWei(this.state.initialContribution),
          web3.utils.toWei(this.state.refundValue),
          this.state.nMaxParticipants,
          this.state.minVotePercentageToRefund 
        )
        .send({
          from: accounts[0]
        });
      this.setState({ showSuccessMessage: true});
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }

    this.setState({ 
      loading: false,
      contractName: '',
      initialContribution: '',
      refundValue: '',
      nMaxParticipants: '',
      minVotePercentageToRefund: ''
    });
  };

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em', display: 'flex', justifyContent: 'center' }} vertical>
          <Card style={{width: '500px'}}>
            <Card.Content header="Novo Contrato"/>
            <Card.Content>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <label>Nome do contrato</label>
                  <input
                    value={this.state.contractName}
                    onChange={event => this.setState({ contractName: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Contribuição inicial</label>
                  <Input labelPosition='right' type='text'>
                    <Label basic>$</Label>
                    <input 
                      type='number' step='0.000000000000000001' min='0.000000000000000001'
                      value={this.state.initialContribution}
                      onChange={event => this.setState({ initialContribution: event.target.value })}
                    />
                    <Label>eth</Label>
                  </Input>
                </Form.Field>
                <Form.Field>
                  <label>Reembolso</label>
                  <Input labelPosition='right' type='text'>
                    <Label basic>$</Label>
                    <input 
                      type='number' step='0.000000000000000001' min='0.000000000000000001'
                      value={this.state.refundValue}
                      onChange={event => this.setState({ refundValue: event.target.value })}
                    />  
                    <Label>eth</Label>
                  </Input>
                </Form.Field>
                <Form.Field>
                  <label>Número máximo de participantes</label>
                  <input 
                    type='number' step='1' min='1'
                    value={this.state.nMaxParticipants}
                    onChange={event => this.setState({ nMaxParticipants: event.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Percentagem mínima de votos para liberar reembolso</label>
                  <Input labelPosition='right' type='text'>
                    <input 
                      type='number' step='1' min='1' max='100'
                      value={this.state.minVotePercentageToRefund}
                      onChange={event => this.setState({ minVotePercentageToRefund: event.target.value })}
                    />
                    <Label>%</Label>
                  </Input>
                </Form.Field>
                {
                  this.state.showSuccessMessage &&
                  <Message positive>
                    <Message.Header>Contrato criado com sucesso!</Message.Header>
                  </Message>
                }
                {
                  this.state.errorMessage &&
                  <Message negative>
                    <Message.Header>Falha ao criar o contrato!</Message.Header>
                    {this.state.errorMessage}
                  </Message>
                }
                <div style={{textAlign: 'right'}}>
                  <Button loading={this.state.loading}>Criar contrato</Button>
                </div>
              </Form>
            </Card.Content>
          </Card>
        </Segment>
      </DesktopContainer>
    )
  }
}

export default CreateNewComponent;
