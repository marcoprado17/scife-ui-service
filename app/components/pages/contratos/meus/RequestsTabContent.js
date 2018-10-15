import React, { Component } from 'react';
import {
  Tab,
  Segment,
  Table,
  Button,
  Message,
  Label
} from 'semantic-ui-react';
import LatLong from "../../../LatLong";
import BoolIcon from "../../../BoolIcon";
import moment from "moment";
import crypto from 'crypto';
let web3;
const browserImports = () => {
  web3 = require('../../../../../ethereum/web3').default;
}

class Request extends Component {
  constructor(props){
    super(props);
    this.state = {
      approving: false,
      iAlreadyApproved: this.props.iAlreadyApproved,
      nApprovers: this.props.nApprovers,
      requiringRefund: false,
      refundMade: this.props.refundMade,
      contractBalance: this.props.contractBalance
    };
    this.browserDependenciesImported = false;
  }

  approve = async () => {
    console.log(this.props);
    let idx = this.props.idx;
    console.log(idx);
    this.setState({
      approving: true,
      successApproveMessage: "",
      errorApproveMessage: "",
    });

    const accounts = await web3.eth.getAccounts();

    this.props.smartCarInsuranceContract.methods.approveRequest(idx).send({
        from: accounts[0]
    })
      .then(() => {
        this.setState((oldState) => ({
          approving: false,
          iAlreadyApproved: true,
          successApproveMessage: "Requisição aprovada com sucesso",
          nApprovers: Number(oldState.nApprovers) + 1
        }));
      })
      .catch((err) => {
        this.setState({
          approving: false,
          errorApproveMessage: err.message
        });
      });
  }

  requireRefund = async () => {
    this.setState({
      requiringRefund: true,
      successRefundessage: "",
      errorRefundMessage: "",
    });

    let idx = this.props.idx;
    const accounts = await web3.eth.getAccounts();

    this.props.smartCarInsuranceContract.methods.getRefund(idx).send({
        from: accounts[0]
    })
      .then(async () => {
        const contractAddress = this.props.smartCarInsuranceContract.options.address;
        let contractBalance = await this.props.web3.eth.getBalance(contractAddress);

        this.setState((oldState) => ({
          requiringRefund: false,
          refundMade: true,
          successRefundMessage: "Reembolso realizado com sucesso",
          contractBalance: contractBalance
        }));
      })
      .catch((err) => {
        this.setState({
          requiringRefund: false,
          errorRefundMessage: err.message
        });
      });
  }

  render() {
    console.log("this.props.refundValue", this.props.refundValue);

    return (
      <Segment vertical>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Requisição {this.props.idx}</h3>
          {this.state.iAlreadyApproved &&
            <Label as='a' color='green' content='Requisição já aprovada por mim' style={{ height: '28px' }} />
          }
        </div>
        <b>Criado por: </b>{this.props.creatorAddress}<br />
        <b>Criado em: </b>{this.props.creationTime}<br />
        <b>Caixa do contrato: </b>{web3.utils.fromWei(this.state.contractBalance)} eth<br />
        <b>Reembolso: </b>{web3.utils.fromWei(this.props.refundValue)} eth<br />
        <b>Reembolso realizado: </b><BoolIcon value={this.props.refundMade} /><br />
        <b>Aprovações: </b>{this.state.nApprovers}/{this.props.nParticipants}<br />
        <b>Número mínimo de aprovações: </b>{this.props.nMinApprovers}<br />
        <b>Placa do veículo: </b>{this.props.plate}<br />
        <b>Hora aproximada do roubo ou furto: </b>{this.props.aproxTimeOfTheft}<br />
        <b>Local do furto: </b><LatLong lat={this.props.latTheft} long={this.props.longTheft} /><br />
        <b>Boletim de ocorrência gerado e confirmado pela polícia: </b><BoolIcon value={this.props.boConfirmed} /><br />
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
            {
              this.state.errorRefundMessage &&
              <Message negative style={{ marginTop: "12px" }}>
                <Message.Header>Falha ao tentar obter o reembolso!</Message.Header>
                {this.state.errorApproveMessage}
              </Message>
            }
            {
              this.state.successRefundMessage &&
              <Message positive style={{ marginTop: "12px" }}>
                <Message.Header>{this.state.successRefundMessage}</Message.Header>
              </Message>
            }
            <div style={{ textAlign: 'right' }}>
              <Button type='submit' loading={this.state.requiringRefund} disabled={this.state.refundMade || this.state.requiringRefund || !this.props.iCreated} onClick={this.requireRefund}>Obter reembolso</Button>
              <Button type='submit' loading={this.state.approving} disabled={this.state.iAlreadyApproved || this.state.approving} onClick={this.approve}>Aprovar requisição</Button>
            </div>
          </div>
          :
          <Message negative style={{ marginTop: "12px" }}>
            <Message.Header>Não foi possível decifrar a localização do gps nas horas proximas do roubo.</Message.Header>
            Peça para {this.props.creatorAddress} checar se os dados do gps foram enviados e gerar uma nova requisição com as chaves corretas do gps
          </Message>
        }
      </Segment>
    )
  }
}

class RequestsTabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    if(!this.browserDependenciesImported) {
      browserImports();
      this.browserDependenciesImported = true;
    }

    const accounts = await web3.eth.getAccounts();
    const contractAddress = this.props.smartCarInsuranceContract.options.address;

    let pContractDetails = this.props.smartCarInsuranceContract.methods.details().call();
    let pNMinApprovers = this.props.smartCarInsuranceContract.methods.getMinApprovers().call();
    let pContractBalance = this.props.web3.eth.getBalance(contractAddress);

    let [contractDetails, nMinApprovers, contractBalance] = await Promise.all([pContractDetails, pNMinApprovers, pContractBalance]);

    let requests = await this.props.smartCarInsuranceContract.methods.getLengthOfRequests().call()
      .then((l) => {
        let pRequests = [];
        for(let i = 0; i < l; i++){
          pRequests.push(this.props.smartCarInsuranceContract.methods.requests(i).call());
        }
        return Promise.all(pRequests);
      })
      .then((requests) => {
        let pCompleteRequests = requests.map(async (request, requestIdx) => {
          let requestData = JSON.parse(request.encodedData);
          let keysOfGpsData = requestData.keysOfGpsData;
          let pAllGpsData = keysOfGpsData.map((keyOfGpsData) => {
            return this.props.smartCarInsuranceContract.methods.gpsDataByUserAddress(request.creatorAddress, keyOfGpsData[0]).call();
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

          let iAlreadyApproved = await this.props.smartCarInsuranceContract.methods.iAlreadyApproved(requestIdx).call({
            from: accounts[0]
          });

          let iCreated = request.creatorAddress == accounts[0];

          return {
            carLocationHistory,
            boConfirmed: request.boConfirmed,
            creatorAddress: request.creatorAddress,
            nApprovers: request.nApprovers,
            creationTime: moment(request.unixTimestampOfBlock, 'X').format(),
            nParticipants: contractDetails.nParticipants,
            nMinApprovers: nMinApprovers,
            aproxTimeOfTheft: moment(requestData.unixTimesptampOfTheft, 'X').format(),
            latTheft: requestData.latTheft,
            longTheft: requestData.longTheft,
            iAlreadyApproved: iAlreadyApproved,
            plate: requestData.plate,
            contractBalance: contractBalance,
            refundMade: request.refundMade,
            iCreated: iCreated,
            refundValue: contractDetails.refundValue
          }
        })
        return Promise.all(pCompleteRequests);
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      requests
    });
  }

  render() {
    return (
      <Tab.Pane>
        {
          !this.state.requests &&
          <p>Carregando...</p>
        }
        { this.state.requests && 
          this.state.requests.map((request, idx) => {
            return <Request {...request} key={idx} idx={idx} smartCarInsuranceContract={this.props.smartCarInsuranceContract}/>
        })}
      </Tab.Pane>
    )
  }
}

export default RequestsTabContent;
