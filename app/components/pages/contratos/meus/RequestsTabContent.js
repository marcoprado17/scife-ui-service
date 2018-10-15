import React, { Component } from 'react';
import {
  Tab,
  Segment,
  Table,
  Button,
  Message
} from 'semantic-ui-react';
import LatLong from "../../../LatLong";
import BoolIcon from "../../../BoolIcon";
import moment from "moment";
const crypto = require('crypto');

class RequestsTabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let pContractDetails = this.props.smartCarInsuranceContract.methods.details().call();
    let pNMinApprovers = this.props.smartCarInsuranceContract.methods.getMinApprovers().call();

    let [contractDetails, nMinApprovers] = await Promise.all([pContractDetails, pNMinApprovers]);

    let requests = await this.props.smartCarInsuranceContract.methods.getLengthOfRequests().call()
      .then((l) => {
        let pRequests = [];
        for(let i = 0; i < l; i++){
          pRequests.push(this.props.smartCarInsuranceContract.methods.requests(i).call());
        }
        return Promise.all(pRequests);
      })
      .then((requests) => {
        let pCompleteRequests = requests.map(async (request) => {
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
            iAlreadyApproved: false
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
          return (
            <Segment vertical>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Requisição {idx}</h3>
                {request.iAlreadyApproved &&
                  <Label as='a' color='green' content='Requisição já aprovada' style={{ height: '28px' }} />
                }
              </div>
              <b>Criado por: </b>{request.creatorAddress}<br />
              <b>Criado em: </b>{request.creationTime}<br />
              <b>Aprovações: </b>{request.nApprovers}/{request.nParticipants}<br />
              <b>Número mínimo de aprovações: </b>{request.nMinApprovers}<br />
              <b>Hora aproximada do roubo ou furto: </b>{request.aproxTimeOfTheft}<br />
              <b>Local do furto: </b><LatLong lat={request.latTheft} long={request.longTheft} /><br />
              <b>Boletim de ocorrência gerado e confirmado pela polícia: </b><BoolIcon value={request.boConfirmed} /><br />
              {
                request.carLocationHistory.length > 0 ?
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
                      {request.carLocationHistory.map((carLocation) => {
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
                  <div style={{ textAlign: 'right' }}>
                    <Button type='submit' disabled={request.iAlreadyApproved}>Aprovar requisição</Button>
                  </div>
                </div>
                :
                <Message negative style={{ marginTop: "12px" }}>
                  <Message.Header>Não foi possível decifrar a localização do gps nas horas proximas do roubo.</Message.Header>
                  Peça para {request.creatorAddress} gerar uma nova requisição com as chaves corretas do gps
                </Message>
              }
            </Segment>
          )
        })}
      </Tab.Pane>
    )
  }
}

export default RequestsTabContent;
