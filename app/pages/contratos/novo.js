import React, {Component} from 'react'
import {
  Segment
} from 'semantic-ui-react'
import DesktopContainer from "../../components/DesktopContainer"

class CreateNewComponent extends Component {
  static async getInitialProps({pathname}) {
    return {pathname}
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em' }} vertical>
            <p>Criar novo contrato</p>
        </Segment>
      </DesktopContainer>
    )
  }
}

export default CreateNewComponent;
