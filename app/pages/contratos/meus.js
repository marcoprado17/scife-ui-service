import React, { Component } from 'react';
import {
  Segment,
  Card,
  Tab
} from 'semantic-ui-react';
import DesktopContainer from "../../components/DesktopContainer";
import NewRequestTabContent from "../../components/pages/contratos/meus/NewRequestTabContent";
import DetailsTabContent from "../../components/pages/contratos/meus/DetailsTabContent";
import MembersTabContent from "../../components/pages/contratos/meus/MembersTabContent";
import RequestsTabContent from "../../components/pages/contratos/meus/RequestsTabContent";
import ContractHeader from "../../components/pages/contratos/meus/ContractHeader";
let web3;
let smartCarInsuranceContractFactory;
let SmartCarInsuranceContract;
const browserImports = () => {
  web3 = require('../../../ethereum/web3').default;
  smartCarInsuranceContractFactory = require('../../../ethereum/smartCarInsuranceContractFactory').default;
  SmartCarInsuranceContract = require('../../../ethereum/SmartCarInsuranceContract').default;
}

export default class MyContractsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.browserDependenciesImported = false;
  }

  static async getInitialProps({ pathname }) {
    return {
      pathname,
    }
  }

  async componentDidMount() {
    if(!this.browserDependenciesImported) {
      browserImports();
      this.browserDependenciesImported = true;
    }

    let account = (await web3.eth.getAccounts())[0];
    let myContractsAddresses = await smartCarInsuranceContractFactory.methods.getMyContractAddresses().call({
      from: account
    });

    let smartCarInsuranceContractByContractAddress = {};
    myContractsAddresses.map((contractAddress) => {
      smartCarInsuranceContractByContractAddress[contractAddress] = SmartCarInsuranceContract(contractAddress);
    });

    this.setState({
      web3,
      smartCarInsuranceContractByContractAddress
    });

    // myContractsAddresses.map(async myContractAddress => {
    //   let smartCarInsuranceContract = SmartCarInsuranceContract(myContractAddress);
    //   let detailsPromise = smartCarInsuranceContract.methods.details().call();
    //   let balancePromise = web3.eth.getBalance(myContractAddress);
    //   let membersPromise = smartCarInsuranceContract.methods.getMembers().call();
    //   let requestsPromise = smartCarInsuranceContract.methods.getLengthOfRequests().call()
    //     .then((l) => {
    //       let allRequestsPromise = []
    //       for(let i = 0; i < l; i++){
    //         allRequestsPromise.push(smartCarInsuranceContract.methods.requests(i).call());
    //       }
    //       return Promise.all(allRequestsPromise);
    //     });
    //   let [details, balance, members, requests] = await Promise.all([detailsPromise, balancePromise, membersPromise, requestsPromise]);
      // requests = await Promise.all(requests.map(async (request) => {
      //   let decodedData = (() => {
      //     try{
      //       return JSON.parse(request.encodedData);
      //     }
      //     catch(err){
      //       return {};
      //     }
      //   })();
      //   let keys = [];
      //   let carLocationHistoryPromises = decodedData.keysOfGpsData.map((keyOfGpsData) => {
      //     let idx = keyOfGpsData[0];
      //     let key = keyOfGpsData[1];
      //     keys.push(key);
      //     return smartCarInsuranceContract.methods.gpsDataByUserAddress(account, idx).call();
      //   })

      //   let carLocationHistoryGpsData = await Promise.all(carLocationHistoryPromises);

      //   let carLocationHistory = carLocationHistoryGpsData.map((gpsData, idx) => {
      //     console.log(gpsData.encryptedLatLong);
      //     const decipher = crypto.createDecipher("aes256", keys[idx]);
      //     let decrypedLatLong = {}
      //     try{
      //       decrypedLatLong = decipher.update(gpsData.encryptedLatLong, 'hex', 'utf8');
      //       decrypedLatLong += decipher.final('utf8');
      //     }
      //     catch(err){
      //       console.error(err);
      //     }
      //     console.log(decrypedLatLong);
      //     return [moment.utc(gpsData.creationUnixTimestamp, 'X').format(), decrypedLatLong.lat, decrypedLatLong.long];
      //   });

      //   // TODO: Obter iAlreadyApproved and carLocationHistory
      //   return {
      //     createdBy: request.creatorAddress,
      //     creationTime: moment.utc(Number(request.unixTimestampOfBlock), 'X').format(),
      //     aproxTimeOfTheft: moment.utc(decodedData.unixTimesptampOfTheft, 'X').format(),
      //     theftLocation: [decodedData.latTheft, decodedData.longTheft],
      //     carLocationHistory: carLocationHistory,
      //     approvers: request.nApprovers,
      //     nTotalApprovers: details.nParticipants,
      //     nMinApprovers: Math.ceil(details.nParticipants*details.minVotePercentageToRefund/100),
      //     iAlreadyApproved: false,
      //     boConfirmed: request.boConfirmed
      //   }
      // }));
      // TODO: Obter os requests de forma correta
    //   requests = [];
    //   contracts.push({
    //     balance,
    //     details,
    //     smartCarInsuranceContract,
    //     members,
    //     requests,
    //     address: myContractAddress
    //   });
    //   this.setState({ contracts });
    // });
  }

  render() {
    console.log("render");
    console.log(this.state);
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em' }} vertical>
          { (this.state.smartCarInsuranceContractByContractAddress && web3) &&
            Object.keys(this.state.smartCarInsuranceContractByContractAddress).map((contractAddress) => {
              let smartCarInsuranceContract = this.state.smartCarInsuranceContractByContractAddress[contractAddress];
              return (
                <Card key={contractAddress} style={{ width: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                  <Card.Content>
                    <ContractHeader
                      smartCarInsuranceContract={smartCarInsuranceContract} 
                      web3={web3}
                    />
                    <Tab style={{ marginTop: '12px' }} panes={[
                      {
                        menuItem: 'Detalhes', render: () =>
                          <DetailsTabContent
                            smartCarInsuranceContract={smartCarInsuranceContract} 
                            web3={web3}
                          />
                      },
                      {
                        menuItem: 'Participantes', render: () =>
                          <MembersTabContent
                            smartCarInsuranceContract={smartCarInsuranceContract} 
                            web3={web3}
                          />
                      },
                      {
                        menuItem: 'Requisições', render: () =>
                          <RequestsTabContent
                            smartCarInsuranceContract={smartCarInsuranceContract} 
                            web3={web3}
                          />
                      },
                      {
                        menuItem: 'Criar Requisição', render: () =>
                          <NewRequestTabContent
                            smartCarInsuranceContract={smartCarInsuranceContract} 
                            web3={web3}
                          />
                      },
                    ]} />
                  </Card.Content>
                </Card>
              )
          })}
        </Segment>
      </DesktopContainer>
    )
  }
}
