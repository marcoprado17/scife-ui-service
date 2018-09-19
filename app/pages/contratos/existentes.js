import React, {Component} from 'react'
import {
  Segment,
  Card,
  Icon,
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
        requireGpsAndBOConfirmation: true,
        requireVote: true,
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
        requireGpsAndBOConfirmation: true,
        requireVote: false,
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
        requireGpsAndBOConfirmation: false,
        requireVote: true,
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
                    <b>Requer confirmação de roupo por GPS e B.O.: </b>{ contractData.requireGpsAndBOConfirmation ? <Icon name='check'/> : <Icon name='close'/>}<br/>
                    <b>Requer votação para liberar o reembolso: </b>{ contractData.requireVote ? <Icon name='check'/> : <Icon name='close'/>}<br/>
                    <b>Percentagem mínima de votos para liberar reembolso: </b>{contractData.minVotePercentage} %<br/>
                  </Card.Content>
                  <Card.Content style={{textAlign: 'right'}}>
                    <Button>Participar</Button>
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
