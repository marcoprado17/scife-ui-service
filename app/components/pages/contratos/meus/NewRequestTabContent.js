import React, { Component } from 'react';
import {
  Button,
  Form,
  Message,
  Tab
} from 'semantic-ui-react';
import moment from "moment";
const bip39 = require("bip39");
const hdkey = require('ethereumjs-wallet/hdkey');

class NewRequestTabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  onSubmit = async () => {
    this.setState({
      loading: true, errorMessage: "", successMessage: ""
    });

    let account = (await this.props.web3.eth.getAccounts())[0];

    console.log(this.state);
    console.log(moment.utc(this.state.timeOfTheft).format("X"));

    let unixTimesptampOfTheft = Number(moment.utc(this.state.timeOfTheft).format("X"));
    console.log(unixTimesptampOfTheft);
    // TODO: Remover esse unixTimesptampOfTheft temporário
    unixTimesptampOfTheft = 1539558638;

    try {
      let gpsDataIndex = Number(await this.props.smartCarInsuranceContract.methods.getGpsDataIndex(account, unixTimesptampOfTheft).call());
      let min = Math.max(gpsDataIndex - 6, 0);
      let lengthOfGpsData = await this.props.smartCarInsuranceContract.methods.getLengthOfGpsData(account).call();
      let max = Math.min(gpsDataIndex + 6, lengthOfGpsData - 1);

      let keysOfGpsData = [];

      const gpsHdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(this.state.mnemonic));

      let pAllGpsData = [];
      
      for (let i = min; i <= max; i++) {
        pAllGpsData.push(this.props.smartCarInsuranceContract.methods.gpsDataByUserAddress(account, i).call());
      }

      let allGpsData = await Promise.all(pAllGpsData);

      for (let i = min; i <= max; i++) {
        let gpsData = allGpsData[i-min];
        let walledChildrenIdx = gpsData.creationUnixTimestamp - 946684800;
        let key = gpsHdwallet.deriveChild(walledChildrenIdx).getWallet().getPrivateKey().toString('hex');
        keysOfGpsData.push([i, key])
      }

      let gpsData = {
        unixTimesptampOfTheft: unixTimesptampOfTheft,
        latTheft: this.state.lat,
        longTheft: this.state.long,
        keysOfGpsData: keysOfGpsData
      }

      try {
        await this.props.smartCarInsuranceContract.methods.createNewRefundRequest(JSON.stringify(gpsData)).send({
          from: account
        });
        this.setState({ successMessage: "Nova requisição de reembolso criada com sucesso!", loading: false });
      }
      catch (err) {
        this.setState({ errorMessage: err.message, loading: false });
      }
    }
    catch (err) {
      console.error(err);
      this.setState({ errorMessage: err.message, loading: false });
    }
  }

  render() {
    console.log(this.state);
    return (
      <Tab.Pane>
        <Form onSubmit={this.onSubmit} style={{ padding: '18px 8px' }}>
          <Form.Group>
            <Form.Field width="8">
              <label>Dia e hora aproximada do roubo (em UTC)</label>
              <input
                type='datetime-local'
                value={this.state.timeOfTheft}
                onChange={event => this.setState({ timeOfTheft: event.target.value })}
              />
            </Form.Field>
            <Form.Field width="4">
              <label>Latidude (do local do roubo)</label>
              <input type='number' min='-90' max='90' step='0.00000001'
                value={this.state.lat}
                onChange={event => this.setState({ lat: event.target.value })}
              />
            </Form.Field>
            <Form.Field width="4">
              <label>Longitude (do local do roubo)</label>
              <input type='number' min='-180' max='180' step='0.00000001'
                value={this.state.long}
                onChange={event => this.setState({ long: event.target.value })}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Mnemonico utilizado por seu gps para criptografar os dados</label>
            <input type='text'
              value={this.state.mnemonic}
              onChange={event => this.setState({ mnemonic: event.target.value })}
            />
          </Form.Field>
          <Message info header='Não se preocupe' content="Seu mnemonico só será utilizado para fornecer as chaves para descritografarmos os dados de seu gps nas 24 horas mais proximas do roubo." />
          {
            this.state.successMessage &&
            <Message positive style={{ marginTop: "12px" }}>
              <Message.Header>{this.state.successMessage}</Message.Header>
            </Message>
          }
          {
            this.state.errorMessage &&
            <Message negative style={{ marginTop: "12px" }}>
              <Message.Header>Falha ao tentar criar a nova requisição de reembolso!</Message.Header>
              {this.state.errorMessage}
            </Message>
          }
          <div style={{ textAlign: 'right' }}>
            <Button loading={this.state.loading} disabled={this.state.loading}>Criar requisição</Button>
          </div>
        </Form>
      </Tab.Pane>
    )
  }
}

export default NewRequestTabContent;
