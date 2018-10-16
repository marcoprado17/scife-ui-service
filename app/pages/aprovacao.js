import React, {Component} from 'react'
import {
  Segment,
  Card,
  Button,
  Divider,
  Message,
  Table,
  Container,
  Header,
  Icon
} from 'semantic-ui-react'
import DesktopContainer from "../components/DesktopContainer"
import LatLong from "../components/LatLong"
import BoolIcon from "../components/BoolIcon"
import crypto from 'crypto';
import moment from "moment";
let web3;
let smartCarInsuranceContractFactory;
let SmartCarInsuranceContract;
const browserImports = () => {
  web3 = require('../../ethereum/web3').default;
  smartCarInsuranceContractFactory = require('../../ethereum/smartCarInsuranceContractFactory').default;
  SmartCarInsuranceContract = require('../../ethereum/SmartCarInsuranceContract').default;
}

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boConfirmed: props.boConfirmed
    };
  }

  approve = async () => {
    this.setState({
      approving: true,
      errorApproveMessage: "",
      successApproveMessage: ""
    })

    const accounts = await web3.eth.getAccounts();
    const smartCarInsuranceContract = SmartCarInsuranceContract(this.props.contractAddress);

    smartCarInsuranceContract.methods.confirmBO(this.props.requestIdx).send({
      from: accounts[0]
    })
      .then(() => {
        this.setState({
          approving: false,
          boConfirmed: true,
          successApproveMessage: "BO confirmado com sucesso"
        })
      })
      .catch((err) => {
        this.setState({
          approving: false,
          errorApproveMessage: err.message
        })
      });
  }

  render() {
    return (
      <Card style={{width: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
        <Card.Content>
          <Card.Header style={{marginTop: '8px'}}>Request {this.props.idx}</Card.Header>
          Contrato {this.props.contractName} ({this.props.contractAddress})
          <Divider/>
          <b>Criado por: </b>{this.props.creatorAddress}<br />
          <b>Criado em: </b>{this.props.creationTime}<br />
          <b>Placa do veículo: </b>{this.props.plate}<br />
          <b>Hora aproximada do roubo ou furto: </b>{this.props.aproxTimeOfTheft}<br />
          <b>Local do furto: </b><LatLong lat={this.props.latTheft} long={this.props.longTheft} /><br />
          <b>Boletim de ocorrência gerado e confirmado pela polícia: </b><BoolIcon value={this.state.boConfirmed} /><br />
          {
            this.props.carLocationHistory.length > 0 ?
            <div>
              <b>Histórico da localização do carro: </b><br />
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Tempo (marcado pelo GPS)</Table.HeaderCell>
                    <Table.HeaderCell>Tempo (do bloco)</Table.HeaderCell>
                    <Table.HeaderCell>Localização</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.carLocationHistory.map((carLocation) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{carLocation.creationTime}</Table.Cell>
                        <Table.Cell>{carLocation.blockMineredTime}</Table.Cell>
                        <Table.Cell><LatLong lat={carLocation.lat} long={carLocation.long} /></Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
              {
                this.state.errorApproveMessage &&
                <Message negative style={{ marginTop: "12px" }}>
                  <Message.Header>Falha ao tentar aprovar a requisição!</Message.Header>
                  {this.state.errorApproveMessage}
                </Message>
              }
              {
                this.state.successApproveMessage &&
                <Message positive style={{ marginTop: "12px" }}>
                  <Message.Header>{this.state.successApproveMessage}</Message.Header>
                </Message>
              }
              <div style={{textAlign: 'right'}}>
                <Button type='submit' disabled={this.state.boConfirmed} loading={this.state.approving} onClick={this.approve}>Confirmar BO</Button>
              </div>
            </div>
            :
            <Message negative style={{ marginTop: "12px" }}>
              <Message.Header>Não foi possível decifrar a localização do gps nas horas proximas do roubo.</Message.Header>
              Peça para {this.props.creatorAddress} checar se os dados do gps foram enviados e gerar uma nova requisição com as chaves corretas do gps
            </Message>
          }
        </Card.Content>
      </Card>
    )
  }
}

class CreateNewComponent extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.browserDependenciesImported = false;
  }

  static async getInitialProps({pathname}) {
    return {
      pathname
    }
  }
  
  async componentDidMount(){
    if(!this.browserDependenciesImported) {
      browserImports();
      this.browserDependenciesImported = true;
    }

    const accounts = await web3.eth.getAccounts();

    let contractsAddresses = await smartCarInsuranceContractFactory.methods.getDeployedContracts().call();

    console.log(contractsAddresses);

    let requests = []

    for(let i = 0; i < contractsAddresses.length; i++){
      let contractAddress = contractsAddresses[i];

      let smartCarInsuranceContract = SmartCarInsuranceContract(contractAddress);

      let contractDetails = await smartCarInsuranceContract.methods.details().call();

      let requestsOfContract = await smartCarInsuranceContract.methods.getLengthOfRequests().call()
        .then((l) => {
          let pRequests = [];
          for(let i = 0; i < l; i++){
            pRequests.push(smartCarInsuranceContract.methods.requests(i).call());
          }
          return Promise.all(pRequests);
        })
        .then((requests) => {
          let pCompleteRequests = requests.map(async (request, requestIdx) => {
            let requestData = JSON.parse(request.encodedData);
            let keysOfGpsData = requestData.keysOfGpsData;
            let pAllGpsData = keysOfGpsData.map((keyOfGpsData) => {
              return smartCarInsuranceContract.methods.gpsDataByUserAddress(request.creatorAddress, keyOfGpsData[0]).call();
            })
            let allGpsData = await Promise.all(pAllGpsData);

            let carLocationHistory = [];

            allGpsData.map((gpsData, idx) => {
              try {
                let key = new Buffer(keysOfGpsData[idx][1], 'hex');
                let decipher = crypto.createDecipher("aes256", key);
                let decrypted = decipher.update(gpsData.encryptedLatLong, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                let decryptedLatLong = JSON.parse(decrypted);
                carLocationHistory.push({
                  creationTime: moment(gpsData.creationUnixTimestamp, 'X').format(),
                  blockMineredTime: moment(gpsData.blockUnixTimestamp, 'X').format(),
                  lat: decryptedLatLong.lat,
                  long: decryptedLatLong.long
                })
              }
              catch(err){
                console.log(err);
              }
            });

            request.carLocationHistory = carLocationHistory;
            request.creationTime = moment(request.unixTimestampOfBlock, 'X').format()

            return {
              carLocationHistory,
              boConfirmed: request.boConfirmed,
              creatorAddress: request.creatorAddress,
              creationTime: moment(request.unixTimestampOfBlock, 'X').format(),
              aproxTimeOfTheft: moment(requestData.unixTimesptampOfTheft, 'X').format(),
              latTheft: requestData.latTheft,
              longTheft: requestData.longTheft,
              plate: requestData.plate,
              contractName: contractDetails.name,
              contractAddress: contractAddress,
              requestIdx: requestIdx
            }
          })
          return Promise.all(pCompleteRequests);
        })
        .catch((err) => {
          console.log(err);
        });

      requests.push(...requestsOfContract);
    }
    
    console.log(requests);

    this.setState({
      requests
    })
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em'}} vertical>
          <Container>
            <Header as='h2'>
              <Icon name='shield' />
              <Header.Content>
                Confirmação de BO
                <Header.Subheader>Acesso exclusivo da polícia</Header.Subheader>
              </Header.Content>
            </Header>
            <hr/>
            { !this.state.requests 
              ?
              <p>Carregando...</p>
              :
              this.state.requests.map(function(request, idx){
              return (
                <Request {...request} idx={idx}/>
              )
            })}
          </Container>
        </Segment>
      </DesktopContainer>
    )
  }
}

export default CreateNewComponent;
