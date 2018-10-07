import React, { Component } from 'react';
import {
  Tab
} from 'semantic-ui-react';

class ContractHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <div>
          <h2 style={{ marginBottom: '2px' }}>{contract.name}</h2>
          <h5 style={{ marginTop: '2px' }}>{contract.id}</h5>
        </div>
        <div>
          {contract.requests.some((request) => { return !request.iAlreadyApproved }) &&
            <Label as='a' color='blue' content='Novas requisições' style={{ height: '28px', float: 'right', marginLeft: '4px' }} />
          }
        </div> */}
      </div>
    )
  }
}

export default ContractHeader;
