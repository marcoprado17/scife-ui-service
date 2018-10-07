import React, {Component} from 'react'
import {
  Segment
} from 'semantic-ui-react'
import DesktopContainer from '../../components/DesktopContainer'
import Contract from '../../components/pages/contratos/existentes/Contract';
let smartCarInsuranceContractFactory;
const browserImports = () => {
  smartCarInsuranceContractFactory = require('../../../ethereum/smartCarInsuranceContractFactory').default;
}

export default class ExistentContractsPage extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.browserDependenciesImported = false;
  }

  static async getInitialProps({pathname}) {
    return {
      pathname
    }
  }
  
  async componentDidMount(){
    if(!this.browserDependenciesImported) {
      browserImports();
      this.browserDependenciesImported = true;
    }

    let deployedContractsAddresses = await smartCarInsuranceContractFactory.methods.getDeployedContracts().call();
    
    this.setState({
      deployedContractsAddresses
    });
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em'}} vertical>
            { this.state.deployedContractsAddresses &&
              this.state.deployedContractsAddresses.map((contractAddress) => {
                return (
                  <Contract address={contractAddress}/>
                )
            })}
        </Segment>
      </DesktopContainer>
    )
  }
}
