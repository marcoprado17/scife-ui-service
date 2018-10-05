import React, { Component } from 'react';
import {
  Segment,
  Card,
  Label,
  Tab,
  Table,
  Button,
  Form,
  Message
} from 'semantic-ui-react';
import DesktopContainer from "../../components/DesktopContainer";
import BoolIcon from "../../components/BoolIcon";
import LatLong from "../../components/LatLong";
import moment from "moment";
let smartCarInsuranceFactoryContract = null;
let SmartCarInsuranceContract = null;
let web3 = null;
const bip39 = require("bip39");
const hdkey = require('ethereumjs-wallet/hdkey');
const crypto = require('crypto');

class CreateNewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  onSubmit = async () => {
    this.setState({
      loading: true
    });

    let account = (await web3.eth.getAccounts())[0];

    console.log(this.state);
    console.log(moment.utc(this.state.timeOfTheft).format("X"));

    let unixTimesptampOfTheft = Number(moment.utc(this.state.timeOfTheft).format("X"));
    console.log(unixTimesptampOfTheft);
    // TODO: Remover esse unixTimesptampOfTheft temporário
    unixTimesptampOfTheft = 1538716756;

    try {
      let gpsDataIndex = Number(await this.props.smartCarInsuranceContract.methods.getGpsDataIndex(account, unixTimesptampOfTheft).call());
      let min = Math.max(gpsDataIndex-6, 0);
      let lengthOfGpsData =  await this.props.smartCarInsuranceContract.methods.getLengthOfGpsData(account).call();
      let max = Math.min(gpsDataIndex+6, lengthOfGpsData-1);
  
      let keysOfGpsData = [];

      const gpsHdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));

      for(let i = min; i <= max; i++){
        let gpsData = await this.props.smartCarInsuranceContract.methods.gpsDataByUserAddress(account, i).call();
        let walledChildrenIdx = gpsData.creationUnixTimestamp-946684800;
        let key = gpsHdwallet.deriveChild(walledChildrenIdx).getWallet().getPrivateKey();
        keysOfGpsData.push([i, key])
      }
  
      let gpsData = {
        unixTimesptampOfTheft: unixTimesptampOfTheft,
        latTheft: this.state.lat,
        longTheft: this.state.long,
        keysOfGpsData: keysOfGpsData
      }
  
      console.log("Iniciando chamada");
      try {
        await this.props.smartCarInsuranceContract.methods.createNewRefundRequest(JSON.stringify(gpsData)).send({
          from: account
        });
        this.setState({successMessage: "Nova requisição de reembolso criada com sucesso!", loading: false});
      }
      catch(err){
        this.setState({errorMessage: err.message, loading: false});
      }
    }
    catch(err){
      console.error(err);
      this.setState({errorMessage: err.message, loading: false});
    }
  }

  render() {
    console.log(this.state);
    return (
      <Form onSubmit={this.onSubmit} style={{ padding: '18px 8px' }}>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Dia e hora aproximada do roubo (em UTC)</label>
            <input 
              type='datetime-local' 
              value={this.state.timeOfTheft}
              onChange={event => this.setState({ timeOfTheft: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Latidude (do local do roubo)</label>
            <input type='number' min='-90' max='90' step='0.00000001' 
              value={this.state.lat}
              onChange={event => this.setState({ lat: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Longitude (do local do roubo)</label>
            <input type='number' min='-180' max='180' step='0.00000001' 
              value={this.state.long}
              onChange={event => this.setState({ long: event.target.value })}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Mnemonico utilizado por seu gps para criptografar os dados</label>
          <input type='text'
            value={this.state.mnemonic}
            onChange={event => this.setState({ mnemonic: event.target.value })}
          />
        </Form.Field>
        <Message info header='Não se preocupe' content="Seu mnemonico só será utilizado para fornecer as chaves para descritografarmos os dados de seu gps nas 24 horas mais proximas do roubo." />
        {
          this.state.successMessage &&
          <Message positive style={{marginTop: "12px"}}>
            <Message.Header>{this.state.successMessage}</Message.Header>
          </Message>
        }
        {
          this.state.errorMessage &&
          <Message negative style={{marginTop: "12px"}}>
            <Message.Header>Falha ao tentar criar a nova requisição de reembolso!</Message.Header>
            {this.state.errorMessage}
          </Message>
        }
        <div style={{ textAlign: 'right' }}>
          <Button loading={this.state.loading}>Criar requisição</Button>
        </div>
      </Form>
    )
  }
}

class CreateNewComponent extends Component {
  static async getInitialProps({ pathname }) {
    return {
      pathname,
    }
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    web3 = require('../../../ethereum/web3').default;
    smartCarInsuranceFactoryContract = require('../../../ethereum/smart_car_insurance_factory_contract').default;
    SmartCarInsuranceContract = require('../../../ethereum/smart_car_insurance_contract').default;

    let contracts = [];
    this.setState({ contracts });

    let account = (await web3.eth.getAccounts())[0];
    let myContractsAddresses = await smartCarInsuranceFactoryContract.methods.getMyContractAddresses().call({
      from: account
    });
    myContractsAddresses.map(async myContractAddress => {
      let smartCarInsuranceContract = SmartCarInsuranceContract(myContractAddress);
      let detailsPromise = smartCarInsuranceContract.methods.details().call();
      let balancePromise = web3.eth.getBalance(myContractAddress);
      let membersPromise = smartCarInsuranceContract.methods.getMembers().call();
      let requestsPromise = smartCarInsuranceContract.methods.getLengthOfRequests().call()
        .then((l) => {
          let allRequestsPromise = []
          for(let i = 0; i < l; i++){
            allRequestsPromise.push(smartCarInsuranceContract.methods.requests(i).call());
          }
          return Promise.all(allRequestsPromise);
        });
      let [details, balance, members, requests] = await Promise.all([detailsPromise, balancePromise, membersPromise, requestsPromise]);
      requests = await Promise.all(requests.map(async (request) => {
        let decodedData = (() => {
          try{
            return JSON.parse(request.encodedData);
          }
          catch(err){
            return {};
          }
        })();
        let keys = [];
        let carLocationHistoryPromises = decodedData.keysOfGpsData.map((keyOfGpsData) => {
          let idx = keyOfGpsData[0];
          let key = keyOfGpsData[1];
          keys.push(key);
          return smartCarInsuranceContract.methods.gpsDataByUserAddress(account, idx).call();
        })

        let carLocationHistoryGpsData = await Promise.all(carLocationHistoryPromises);

        let carLocationHistory = carLocationHistoryGpsData.map((gpsData, idx) => {
          console.log(gpsData.encryptedLatLong);
          const decipher = crypto.createDecipher("aes256", keys[idx]);
          let decrypedLatLong = {}
          try{
            decrypedLatLong = decipher.update(gpsData.encryptedLatLong, 'hex', 'utf8');
            decrypedLatLong += decipher.final('utf8');
          }
          catch(err){
            console.error(err);
          }
          console.log(decrypedLatLong);
          return [moment.utc(gpsData.creationUnixTimestamp, 'X').format(), decrypedLatLong.lat, decrypedLatLong.long];
        });

        // TODO: Obter iAlreadyApproved and carLocationHistory
        return {
          createdBy: request.creatorAddress,
          creationTime: moment.utc(Number(request.unixTimestampOfBlock), 'X').format(),
          aproxTimeOfTheft: moment.utc(decodedData.unixTimesptampOfTheft, 'X').format(),
          theftLocation: [decodedData.latTheft, decodedData.longTheft],
          carLocationHistory: carLocationHistory,
          approvers: request.nApprovers,
          nTotalApprovers: details.nParticipants,
          nMinApprovers: Math.ceil(details.nParticipants*details.minVotePercentageToRefund/100),
          iAlreadyApproved: false,
          boConfirmed: request.boConfirmed
        }
      }));
      contracts.push({
        balance,
        details,
        smartCarInsuranceContract,
        members,
        requests,
        address: myContractAddress
      });
      this.setState({ contracts });
    });
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em' }} vertical>
          { this.state.contracts &&
            this.state.contracts.map((contract) => {
            return (
              <Card style={{ width: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Card.Content>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h2 style={{ marginBottom: '2px' }}>{contract.name}</h2>
                      <h5 style={{ marginTop: '2px' }}>{contract.id}</h5>
                    </div>
                    <div>
                      {contract.requests.some((request) => { return !request.iAlreadyApproved }) &&
                        <Label as='a' color='blue' content='Novas requisições' style={{ height: '28px', float: 'right', marginLeft: '4px' }} />
                      }
                    </div>
                  </div>
                  <Tab style={{ marginTop: '12px' }} panes={[
                    {
                      menuItem: 'Detalhes', render: () =>
                        <Tab.Pane>
                          <b>Nome do contrato: </b>{contract.details.name}<br />
                          <b>Endereço do contrato: </b>{contract.address}<br />
                          <b>Criador do contrato: </b>{contract.details.creatorId}<br />
                          <b>Contribuição inicial: </b>{web3.utils.fromWei(contract.details.initialContribution)} eth<br />
                          <b>Reembolso: </b>{web3.utils.fromWei(contract.details.refundValue)} eth<br />
                          <b>Caixa do contrato: </b>{web3.utils.fromWei(contract.balance)} eth<br />
                          <b>Número de participantes: </b>{contract.details.nParticipants}/{contract.details.nMaxParticipants}<br />
                          <b>Percentagem mínima de votos para liberar reembolso: </b>{contract.details.minVotePercentageToRefund} %<br />
                        </Tab.Pane>
                    },
                    {
                      menuItem: 'Participantes', render: () =>
                        <Tab.Pane>
                          <Table basic='very'>
                            <Table.Body>
                              {contract.members.map((memberAddress) => {
                                return (
                                  <Table.Row>
                                    <Table.Cell>{memberAddress}</Table.Cell>
                                  </Table.Row>
                                )
                              })}
                            </Table.Body>
                          </Table>
                        </Tab.Pane>
                    },
                    {
                      menuItem: 'Requisições', render: () =>
                        <Tab.Pane>
                          {contract.requests.map((request, idx) => {
                            return (
                              <Segment vertical>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <h3>Requisição {idx}</h3>
                                  {request.iAlreadyApproved &&
                                    <Label as='a' color='green' content='Requisição já aprovada' style={{ height: '28px' }} />
                                  }
                                </div>
                                <b>Criado por: </b>{request.createdBy}<br />
                                <b>Criado em: </b>{request.creationTime}<br />
                                <b>Aprovações: </b>{request.approvers}/{request.nTotalApprovers}<br />
                                <b>Número mínimo de aprovações: </b>{request.nMinApprovers}<br />
                                <b>Hora aproximada do roubo ou furto: </b>{request.aproxTimeOfTheft}<br />
                                <b>Local do furto: </b><LatLong lat={request.theftLocation[0]} long={request.theftLocation[1]} /><br />
                                <b>Boletim de ocorrência gerado e confirmado pela polícia: </b><BoolIcon value={request.boConfirmed} /><br />
                                <b>Histórico da localização do carro: </b><br />
                                <Table>
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell>Tempo</Table.HeaderCell>
                                      <Table.HeaderCell>Localização</Table.HeaderCell>
                                    </Table.Row>
                                  </Table.Header>
                                  <Table.Body>
                                    {request.carLocationHistory.map((carLoactionHistoryRow) => {
                                      return (
                                        <Table.Row>
                                          <Table.Cell>{carLoactionHistoryRow[0]}</Table.Cell>
                                          <Table.Cell><LatLong lat={carLoactionHistoryRow[1]} long={carLoactionHistoryRow[2]} /></Table.Cell>
                                        </Table.Row>
                                      )
                                    })}
                                  </Table.Body>
                                </Table>
                                <div style={{ textAlign: 'right' }}>
                                  <Button type='submit' disabled={request.iAlreadyApproved}>Aprovar requisição</Button>
                                </div>
                              </Segment>
                            )
                          })}
                        </Tab.Pane>
                    },
                    {
                      menuItem: 'Criar Requisição', render: () =>
                        <CreateNewRequest smartCarInsuranceContract={contract.smartCarInsuranceContract}></CreateNewRequest>
                    },
                  ]} />
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
