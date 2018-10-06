import React, { Component } from 'react';
import {
  Tab
} from 'semantic-ui-react';

class DetailsTabContent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Tab.Pane>
        <b>Nome do contrato: </b>{this.props.details.name}<br />
        <b>Endereço do contrato: </b>{this.props.address}<br />
        <b>Criador do contrato: </b>{this.props.details.creatorId}<br />
        <b>Contribuição inicial: </b>{this.props.web3.utils.fromWei(this.props.details.initialContribution)} eth<br />
        <b>Reembolso: </b>{this.props.web3.utils.fromWei(this.props.details.refundValue)} eth<br />
        <b>Caixa do contrato: </b>{this.props.web3.utils.fromWei(this.props.balance)} eth<br />
        <b>Número de participantes: </b>{this.props.details.nParticipants}/{this.props.details.nMaxParticipants}<br />
        <b>Percentagem mínima de votos para liberar reembolso: </b>{this.props.details.minVotePercentageToRefund} %<br />
      </Tab.Pane>
    )
  }
}

export default DetailsTabContent;
