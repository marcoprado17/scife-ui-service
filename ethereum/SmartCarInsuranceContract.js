import web3 from './web3';
import SmartCarInsuranceContractFactory from './build/SmartCarInsuranceContractFactory.json';
import configs from './configs';

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(SmartCarInsuranceContractFactory.interface),
        configs.factoryAddress
    );
};
