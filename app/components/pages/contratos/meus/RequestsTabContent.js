import React, { Component } from 'react';
import {
  Tab,
  Segment,
  Table,
  Button
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
    console.log("componentDidMount called");
    console.log(this.state);

    console.log("this.props.smartCarInsuranceContract.methods", this.props.smartCarInsuranceContract.methods);

    let lengthOfRequests = await this.props.smartCarInsuranceContract.methods.getLengthOfRequests().call();

    console.log("lengthOfRequests", lengthOfRequests);

    let requestsPromises = [];
    // TODO: Setar initialRequestIdx para 0
    let initialRequestIdx = lengthOfRequests-1;
    for(let i = initialRequestIdx; i < lengthOfRequests; i++){
      requestsPromises.push(this.props.smartCarInsuranceContract.methods.requests(i).call());
    }

    let requests = [];

    let requestsResults = await Promise.all(requestsPromises);
    let contractDetails = await this.props.smartCarInsuranceContract.methods.details().call();
    let nMinApprovers = await this.props.smartCarInsuranceContract.methods.getMinApprovers().call();

    console.log("contractDetails", contractDetails);

    for(let j = 0; j < requestsResults.length; j++){
      let requestResult = requestsResults[j];
      console.log(requestResult);
      let requestData = JSON.parse(requestResult.encodedData);

      console.log("requestData", requestData);

      let carLocationHistory = []

      for(let i = 0; i < requestData.keysOfGpsData.length; i++){
        let keyData = requestData.keysOfGpsData[i];
        console.log("keyData", keyData);
        let gpsData = await this.props.smartCarInsuranceContract.methods.gpsDataByUserAddress(requestResult.creatorAddress, keyData[0]).call();
        console.log("gpsData", gpsData);

        console.log("idx: ", keyData[0])
        const key = new Buffer(keyData[1], 'hex');
        console.log(key);
        const decipher = crypto.createDecipher("aes256", key);
        let decrypted = decipher.update(gpsData.encryptedLatLong, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log(decrypted);

        let decryptedLatLong = JSON.parse(decrypted);

        carLocationHistory.push({
          creationTime: moment(gpsData.creationUnixTimestamp, 'X').format(),
          blockMineredTime: moment(gpsData.blockUnixTimestamp, 'X').format(),
          lat: decryptedLatLong.lat,
          long: decryptedLatLong.long
        });
      }

      console.log("carLocationHistory", carLocationHistory);

      // TODO: Obter o iAlreadyApproved

      console.log(moment(requestResult.unixTimestampOfBlock, 'X').format())

      requests.push({
        carLocationHistory,
        boConfirmed: requestResult.boConfirmed,
        creatorAddress: requestResult.creatorAddress,
        nApprovers: requestResult.nApprovers,
        creationTime: moment(requestResult.unixTimestampOfBlock, 'X').format(),
        nParticipants: contractDetails.nParticipants,
        nMinApprovers: nMinApprovers,
        aproxTimeOfTheft: moment(requestData.unixTimesptampOfTheft, 'X').format(),
        latTheft: requestData.latTheft,
        longTheft: requestData.longTheft,
        iAlreadyApproved: false
      })
    }

    console.log("requests", requests);

    this.setState({
      requests
    });

    // this.setState({
    //   members: await this.props.smartCarInsuranceContract.methods.getMembers().call()
    // });
  }

  render() {
    return (
      <Tab.Pane>
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
            </Segment>
          )
        })}
      </Tab.Pane>
    )
  }
}

export default RequestsTabContent;
