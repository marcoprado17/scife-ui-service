import React, { Component } from 'react';
import {
  Tab
} from 'semantic-ui-react';

class DetailsTabContent extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    console.log("componentDidMount called");

    let address = this.props.smartCarInsuranceContract.options.address;
    let detailsPromise = this.props.smartCarInsuranceContract.methods.details().call();
    let balancePromise = this.props.web3.eth.getBalance(address);

    let [details, balance] = await Promise.all([detailsPromise, balancePromise]);

    this.setState({
      details,
      balance,
      address
    });
  }

  render() {
    return (
      <Tab.Pane>
        {
          (this.state.details && this.state.balance) &&
          <div>
            <b>Nome do contrato: </b>{this.state.details.name}<br />
            <b>Endereço do contrato: </b>{this.state.address}<br />
            <b>Criador do contrato: </b>{this.state.details.creatorId}<br />
            <b>Contribuição inicial: </b>{this.props.web3.utils.fromWei(this.state.details.initialContribution)} eth<br />
            <b>Reembolso: </b>{this.props.web3.utils.fromWei(this.state.details.refundValue)} eth<br />
            <b>Caixa do contrato: </b>{this.props.web3.utils.fromWei(this.state.balance)} eth<br />
            <b>Número de participantes: </b>{this.state.details.nParticipants}/{this.state.details.nMaxParticipants}<br />
            <b>Percentagem mínima de votos para liberar reembolso: </b>{this.state.details.minVotePercentageToRefund} %<br />
          </div>
        }
      </Tab.Pane>
    )
  }
}

export default DetailsTabContent;
