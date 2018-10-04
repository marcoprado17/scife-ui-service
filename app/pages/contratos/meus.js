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
let smartCarInsuranceFactoryContract = null;
let SmartCarInsuranceContract = null;
let web3 = null;

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
      let [details, balance] = await Promise.all([detailsPromise, balancePromise]);
      contracts.push({
        address: myContractAddress,
        balance: balance,
        details: details,
        smartCarInsuranceContract: smartCarInsuranceContract,
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
                                <b>Boletim de ocorrência gerado e confirmado pela pólicia: </b><BoolIcon value={request.boConfirmed} /><br />
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
                        <Form onSubmit={this.onSubmit} style={{ padding: '18px 8px' }}>
                          <Form.Group widths='equal'>
                            <Form.Field>
                              <label>Dia e hora aproximada do roubo</label>
                              <input type='datetime-local' />
                            </Form.Field>
                            <Form.Field>
                              <label>Latidude (do local do roubo)</label>
                              <input type='number' min='-90' max='90' step='0.00000001' />
                            </Form.Field>
                            <Form.Field>
                              <label>Longitude (do local do roubo)</label>
                              <input type='number' min='-180' max='180' step='0.00000001' />
                            </Form.Field>
                          </Form.Group>
                          <Form.Field>
                            <label>Mnemonico de sua conta ethereum</label>
                            <input type='text' />
                          </Form.Field>
                          <Message info header='Não se preocupe' content="Seu mnemonico só será utilizado para fornecer as chaves para descritografarmos os dados de seu gps nas 24 horas mais proximas do roubo." />
                          <div style={{ textAlign: 'right' }}>
                            <Button loading={this.state.loading}>Criar requisição</Button>
                          </div>
                        </Form>
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
