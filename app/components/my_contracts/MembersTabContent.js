import React, { Component } from 'react';
import {
  Tab,
  Table
} from 'semantic-ui-react';

class MembersTabContent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <Tab.Pane>
        <Table basic='very'>
          <Table.Body>
            {this.props.members.map((memberAddress) => {
              return (
                <Table.Row>
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
