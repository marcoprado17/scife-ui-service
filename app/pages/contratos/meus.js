import React, {Component} from 'react';
import {
  Segment,
  Card,
  Label,
  Tab,
  Table,
  Button
} from 'semantic-ui-react';
import DesktopContainer from "../../components/DesktopContainer";
import BoolIcon from "../../components/BoolIcon";

class CreateNewComponent extends Component {
  static async getInitialProps({pathname}) {
    let contracts = [
      {
        name: "Contrato 1",
        id: "0x43w3a54sd33ca54346",
        details: {
          creatorId: "0x43534sad45a4sd",
          initialContribution: 1.2,
          monthlyContribution: 0.2,
          refundValue: 5.7,
          contractFund: 12.4,
          nParticipants: 3,
          nMaxParticipants: 20,
          requireGpsAndBOConfirmation: true,
          requireVote: true,
          minVotePercentage: 33,
          hasNewRequest: true,
          closePayment: true
        },
        history: [
          ["08/09/2018", "Contrato foi criado por 0x2323hvg12y3"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"]
        ],
        requests: [
          {
            createdBy: "0xfg2323123vhgv21",
            creationTime: "08/09/2017",
            aproxTimeOfTheft: "08/08/2018 19:26",
            theftLocation: [-23.192226, -45.876944],
            carLocationHistory: [
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
            ],
            approvers: 10,
            nTotalApprovers: 35,
            nMinApprovers: 30,
            iAlreadyApproved: false,
            boConfirmed: false
          },
          {
            createdBy: "0xfg2323123vhgv21",
            creationTime: "08/09/2017",
            aproxTimeOfTheft: "08/08/2018 19:26",
            theftLocation: [-23.192226, -45.876944],
            carLocationHistory: [
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
            ],
            approvers: 10,
            nTotalApprovers: 100,
            nMinApprovers: 30,
            iAlreadyApproved: true,
            boConfirmed: false
          }
        ]
      },
      {
        name: "Contrato 2",
        id: "0x43w3a54sd33ca54346",
        details: {
          creatorId: "0x43534sad45a4sd",
          initialContribution: 1.2,
          monthlyContribution: 0.2,
          refundValue: 5.7,
          contractFund: 12.4,
          nParticipants: 3,
          nMaxParticipants: 20,
          requireGpsAndBOConfirmation: true,
          requireVote: true,
          minVotePercentage: 33,
          hasNewRequest: true,
          closePayment: true
        },
        history: [
          ["08/09/2018", "Contrato foi criado por 0x2323hvg12y3"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"]
        ],
        requests: [
          {
            createdBy: "0xfg2323123vhgv21",
            creationTime: "08/09/2017",
            aproxTimeOfTheft: "08/08/2018 19:26",
            theftLocation: [-23.192226, -45.876944],
            carLocationHistory: [
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
            ],
            approvers: 10,
            nTotalApprovers: 100,
            nMinApprovers: 30,
            iAlreadyApproved: false,
            boConfirmed: false
          },
          {
            createdBy: "0xfg2323123vhgv21",
            creationTime: "08/09/2017",
            aproxTimeOfTheft: "08/08/2018 19:26",
            theftLocation: [-23.192226, -45.876944],
            carLocationHistory: [
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
            ],
            approvers: 10,
            nTotalApprovers: 60,
            nMinApprovers: 30,
            iAlreadyApproved: false,
            boConfirmed: false
          }
        ]
      },
      {
        name: "Contrato 3",
        id: "0x43w3a54sd33ca54346",
        details: {
          creatorId: "0x43534sad45a4sd",
          initialContribution: 1.2,
          monthlyContribution: 0.2,
          refundValue: 5.7,
          contractFund: 12.4,
          nParticipants: 3,
          nMaxParticipants: 20,
          requireGpsAndBOConfirmation: true,
          requireVote: true,
          minVotePercentage: 33,
          hasNewRequest: true,
          closePayment: true
        },
        history: [
          ["08/09/2018", "Contrato foi criado por 0x2323hvg12y3"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"],
          ["08/09/2018", "Novo membro no contrato: 0x23bhj3vj1231"]
        ],
        requests: [
          {
            createdBy: "0xfg2323123vhgv21",
            creationTime: "08/09/2017",
            aproxTimeOfTheft: "08/08/2018 19:26",
            theftLocation: [-23.192226, -45.876944],
            carLocationHistory: [
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
            ],
            approvers: 10,
            nTotalApprovers: 50,
            nMinApprovers: 30,
            iAlreadyApproved: false,
            boConfirmed: false
          },
          {
            createdBy: "0xfg2323123vhgv21",
            creationTime: "08/09/2017",
            aproxTimeOfTheft: "08/08/2018 19:26",
            theftLocation: [-23.192226, -45.876944],
            carLocationHistory: [
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
              ["08/08/2018 19:26", -23.192226, -45.876944],
            ],
            approvers: 10,
            nTotalApprovers: 30,
            nMinApprovers: 30,
            iAlreadyApproved: false,
            boConfirmed: false
          }
        ]
      }
    ];

    return {
      pathname,
      contracts
    }
  }

  constructor(props){
    super(props);
    this.state = {}
  }

  renderLatLong(lat, long){
    return (
      <a href={`http://www.google.com/maps/place/${lat},${long}`} target="_new">
        {lat}, {long}
      </a>
    )
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em'}} vertical>
            {this.props.contracts.map((contract) => {
              return (
                <Card style={{width: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
                  <Card.Content>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div>
                        <h2 style={{marginBottom: '2px'}}>{contract.name}</h2>
                        <h5 style={{marginTop: '2px'}}>{contract.id}</h5>
                      </div>
                      <div>
                        { contract.requests.some((request) => {return !request.iAlreadyApproved}) &&
                          <Label as='a' color='blue' content='Novas requisições' style={{height: '28px', float:'right', marginLeft: '4px'}}/>
                        }
                      </div>
                    </div>
                    <Tab style={{marginTop: '12px'}} panes={[
                      { 
                        menuItem: 'Detalhes', render: () => 
                        <Tab.Pane>
                          <b>Nome do contrato: </b>{contract.name}<br/>
                          <b>Id do contrato: </b>{contract.id}<br/>
                          <b>Criador do contrato: </b>{contract.details.creatorId}<br/>
                          <b>Contribuição inicial: </b>{contract.details.initialContribution} eth<br/>
                          <b>Contribuição mensal: </b>{contract.details.monthlyContribution} eth<br/>
                          <b>Reembolso: </b>{contract.details.refundValue} eth<br/>
                          <b>Caixa do contrato: </b>{contract.details.contractFund} eth<br/>
                          <b>Número de participantes: </b>{contract.details.nParticipants}/{contract.details.nMaxParticipants}<br/>
                          <b>Percentagem mínima de votos para liberar reembolso: </b>{contract.details.minVotePercentage} %<br/>
                        </Tab.Pane> 
                      },
                      { 
                        menuItem: 'Histórico', render: () => 
                        <Tab.Pane>
                          <Table basic='very'>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>Tempo</Table.HeaderCell>
                                <Table.HeaderCell>Mensagem</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {contract.history.map((historyRow) => {
                                return (
                                  <Table.Row>
                                    <Table.Cell>{historyRow[0]}</Table.Cell>
                                    <Table.Cell>{historyRow[1]}</Table.Cell>
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
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <h3>Requisição {idx}</h3>
                                  { request.iAlreadyApproved &&
                                    <Label as='a' color='green' content='Requisição já aprovada' style={{height: '28px'}}/>
                                  }
                                </div>
                                <b>Criado por: </b>{request.createdBy}<br/>
                                <b>Criado em: </b>{request.creationTime}<br/>
                                <b>Aprovações: </b>{request.approvers}/{request.nTotalApprovers}<br/>
                                <b>Número mínimo de aprovações: </b>{request.nMinApprovers}<br/>
                                <b>Hora aproximada do roubo ou furto: </b>{request.aproxTimeOfTheft}<br/>
                                <b>Local do furto: </b>{this.renderLatLong(request.theftLocation[0], request.theftLocation[1])}<br/>
                                <b>Boletim de ocorrência gerado e confirmado pela pólicia: </b><BoolIcon value={request.boConfirmed}/><br/>
                                <b>Histórico da localização do carro: </b><br/>
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
                                          <Table.Cell>{this.renderLatLong(carLoactionHistoryRow[1], carLoactionHistoryRow[2])}</Table.Cell>
                                        </Table.Row>
                                      )
                                    })}
                                  </Table.Body>
                                </Table>
                                <div style={{textAlign: 'right'}}>
                                  <Button type='submit' disabled={request.iAlreadyApproved}>Aprovar requisição</Button>
                                </div>
                              </Segment>
                            )
                          })}
                        </Tab.Pane> 
                      },
                      { 
                        menuItem: 'Criar Requisição', render: () => 
                        <Tab.Pane>A fazer...</Tab.Pane> 
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
