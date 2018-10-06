import React, { Component } from 'react';
import {
  Tab
} from 'semantic-ui-react';

class RequestsTabContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Pane>
        {/* {contract.requests.map((request, idx) => {
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
        })} */}
      </Tab.Pane>
    )
  }
}

export default RequestsTabContent;
