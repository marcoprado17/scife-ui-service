import React, { Component } from 'react';
import {
  Segment,
  Card,
  Label,
  Tab,
  Table,
  Button,
  Form,
  Message
} from 'semantic-ui-react';
import DesktopContainer from "../../components/DesktopContainer";
import BoolIcon from "../../components/BoolIcon";
import LatLong from "../../components/LatLong";
import moment from "moment";
import NewRequestTabContent from "../../components/my_contracts/NewRequestTabContent";
import DetailsTabContent from "../../components/my_contracts/DetailsTabContent";
import MembersTabContent from "../../components/my_contracts/MembersTabContent";
import RequestsTabContent from "../../components/my_contracts/RequestsTabContent";
import ContractHeader from "../../components/my_contracts/ContractHeader";
let smartCarInsuranceFactoryContract = null;
let SmartCarInsuranceContract = null;
let web3 = null;
const crypto = require('crypto');

class MyContractsPage extends Component {
  static async getInitialProps({ pathname }) {
    return {
      pathname,
    }
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    web3 = require('../../../ethereum/web3').default;
    smartCarInsuranceFactoryContract = require('../../../ethereum/smart_car_insurance_factory_contract').default;
    SmartCarInsuranceContract = require('../../../ethereum/smart_car_insurance_contract').default;

    let contracts = [];
    this.setState({ contracts });

    let account = (await web3.eth.getAccounts())[0];
    let myContractsAddresses = await smartCarInsuranceFactoryContract.methods.getMyContractAddresses().call({
      from: account
    });

    myContractsAddresses.map(async myContractAddress => {
      let smartCarInsuranceContract = SmartCarInsuranceContract(myContractAddress);
      let detailsPromise = smartCarInsuranceContract.methods.details().call();
      let balancePromise = web3.eth.getBalance(myContractAddress);
      let membersPromise = smartCarInsuranceContract.methods.getMembers().call();
      let requestsPromise = smartCarInsuranceContract.methods.getLengthOfRequests().call()
        .then((l) => {
          let allRequestsPromise = []
          for(let i = 0; i < l; i++){
            allRequestsPromise.push(smartCarInsuranceContract.methods.requests(i).call());
          }
          return Promise.all(allRequestsPromise);
        });
      let [details, balance, members, requests] = await Promise.all([detailsPromise, balancePromise, membersPromise, requestsPromise]);
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
      requests = [];
      contracts.push({
        balance,
        details,
        smartCarInsuranceContract,
        members,
        requests,
        address: myContractAddress
      });
      this.setState({ contracts });
    });
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em' }} vertical>
          { this.state.contracts &&
            this.state.contracts.map((contract) => {
            return (
              <Card style={{ width: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Card.Content>
                  <ContractHeader/>
                  <Tab style={{ marginTop: '12px' }} panes={[
                    {
                      menuItem: 'Detalhes', render: () =>
                        <DetailsTabContent web3={web3} details={contract.details} address={contract.address} balance={contract.balance}></DetailsTabContent>
                    },
                    {
                      menuItem: 'Participantes', render: () =>
                        <MembersTabContent members={contract.members}/>
                    },
                    {
                      menuItem: 'Requisições', render: () =>
                        <RequestsTabContent/>
                    },
                    {
                      menuItem: 'Criar Requisição', render: () =>
                        <NewRequestTabContent smartCarInsuranceContract={contract.smartCarInsuranceContract} web3={web3}></NewRequestTabContent>
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

export default MyContractsPage;
