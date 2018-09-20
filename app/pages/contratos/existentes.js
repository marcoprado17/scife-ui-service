import React, {Component} from 'react'
import {
  Segment,
  Card,
  Button
} from 'semantic-ui-react'
import DesktopContainer from "../../components/DesktopContainer"

class CreateNewComponent extends Component {
  static async getInitialProps({pathname}) {
    let contracts = [
      {
        name: "Contrato 1",
        id: "0x43w3a54sd33ca54346",
        creatorId: "0x43534sad45a4sd",
        initialContribution: 1.2,
        monthlyContribution: 0.2,
        refundValue: 5.7,
        contractFund: 12.4,
        nParticipants: 3,
        nMaxParticipants: 20,
        minVotePercentage: 33
      },
      {
        name: "Contrato 2",
        id: "0x43w3a54sd33ca54346",
        creatorId: "0x43534sad45a4sd",
        initialContribution: 1.2,
        monthlyContribution: 0.2,
        refundValue: 5.7,
        contractFund: 12.4,
        nParticipants: 3,
        nMaxParticipants: 20,
        minVotePercentage: 33
      },
      {
        name: "Contrato 3",
        id: "0x43w3a54sd33ca54346",
        creatorId: "0x43534sad45a4sd",
        initialContribution: 1.2,
        monthlyContribution: 0.2,
        refundValue: 5.7,
        contractFund: 12.4,
        nParticipants: 3,
        nMaxParticipants: 20,
        minVotePercentage: 50
      }
    ]
    
    return {
      pathname,
      contracts
    }
  }

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em'}} vertical>
            {this.props.contracts.map(function(contractData){
              return (
                <Card style={{width: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
                  <Card.Content header={contractData.name} meta={contractData.id}></Card.Content>
                  <Card.Content extra>
                    <b>Criador: </b>{contractData.creatorId}<br/>
                    <b>Contribuição inicial: </b>{contractData.initialContribution} eth<br/>
                    <b>Contribuição mensal: </b>{contractData.monthlyContribution} eth<br/>
                    <b>Reembolso: </b>{contractData.refundValue} eth<br/>
                    <b>Caixa do contrato: </b>{contractData.contractFund} eth<br/>
                    <b>Número de participantes: </b>{contractData.nParticipants}/{contractData.nMaxParticipants}<br/>
                    <b>Percentagem mínima de votos para liberar reembolso: </b>{contractData.minVotePercentage} %<br/>
                    <div style={{textAlign: 'right'}}>
                      <Button type='submit'>Participar</Button>
                    </div>
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
