import React, { Component } from 'react';
import {
  Tab,
  Table
} from 'semantic-ui-react';

class MembersTabContent extends Component {
  constructor(props){
    super(props);
    this.state = {};
    console.log("constructor called");
  }

  async componentDidMount() {
    console.log("componentDidMount called");
    console.log(this.state);

    this.setState({
      members: await this.props.smartCarInsuranceContract.methods.getMembers().call()
    });
    
  }

  render() {
    return (
      <Tab.Pane>
        <Table basic='very'>
          <Table.Body>
            { this.state.members && 
              this.state.members.map((memberAddress) => {
                return (
                  <Table.Row key={memberAddress}>
                    <Table.Cell>{memberAddress}</Table.Cell>
                  </Table.Row>
                )
            })}
          </Table.Body>
        </Table>
      </Tab.Pane>
    )
  }
}

export default MembersTabContent;
