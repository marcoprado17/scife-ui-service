import React, { Component } from 'react';
import {
  Tab
} from 'semantic-ui-react';

class ContractHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};  
  }

  async componentDidMount() {
    let contractAddress = this.props.smartCarInsuranceContract.options.address;
    let details = await this.props.smartCarInsuranceContract.methods.details().call();

    this.setState({
      contractAddress,
      contractName: details.name
    });
  }

  render() {
    console.log(this.state);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ marginBottom: '2px' }}>{this.state.contractName}</h2>
          <h5 style={{ marginTop: '2px' }}>{this.state.contractAddress}</h5>
        </div>
      </div>
    )
  }
}

export default ContractHeader;
