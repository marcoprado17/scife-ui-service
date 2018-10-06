import React, { Component } from 'react';
import {
  Segment,
  Card,
  Tab
} from 'semantic-ui-react';
import DesktopContainer from "../../components/DesktopContainer";
import NewRequestTabContent from "../../components/my_contracts/NewRequestTabContent";
import DetailsTabContent from "../../components/my_contracts/DetailsTabContent";
import MembersTabContent from "../../components/my_contracts/MembersTabContent";
import RequestsTabContent from "../../components/my_contracts/RequestsTabContent";
import ContractHeader from "../../components/my_contracts/ContractHeader";
if(process.browser) {
  this.web3 = require('../../../ethereum/web3');
  this.smartCarInsuranceContractFactory = require('../../../ethereum/smartCarInsuranceContractFactory');
  this.SmartCarInsuranceContract = require('../../../ethereum/SmartCarInsuranceContract');
}

export default class MyContractsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static async getInitialProps({ pathname }) {
    return {
      pathname,
    }
  }

  async componentDidMount() {
    
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
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em' }} vertical>
          { (this.state.myContractsAddresses && this.state.web3) &&
            this.state.myContractsAddresses.map((contractAddress) => {
            return (
              <Card style={{ width: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Card.Content>
                  <ContractHeader 
                    smartCarInsuranceContract={this.state.smartCarInsuranceContractByContractAddress[contractAddress]} 
                    web3={this.state.web3}
                  />
                  <Tab style={{ marginTop: '12px' }} panes={[
                    {
                      menuItem: 'Detalhes', render: () =>
                        <DetailsTabContent
                          smartCarInsuranceContract={this.state.smartCarInsuranceContractByContractAddress[contractAddress]}
                          web3={this.state.web3}
                        />
                    },
                    {
                      menuItem: 'Participantes', render: () =>
                        <MembersTabContent
                          smartCarInsuranceContract={this.state.smartCarInsuranceContractByContractAddress[contractAddress]} 
                          web3={this.state.web3}
                        />
                    },
                    {
                      menuItem: 'Requisições', render: () =>
                        <RequestsTabContent
                          smartCarInsuranceContract={this.state.smartCarInsuranceContractByContractAddress[contractAddress]} 
                          web3={this.state.web3}
                        />
                    },
                    {
                      menuItem: 'Criar Requisição', render: () =>
                        <NewRequestTabContent
                          smartCarInsuranceContract={this.state.smartCarInsuranceContractByContractAddress[contractAddress]} 
                          web3={this.state.web3}
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
