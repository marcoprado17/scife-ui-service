import Web3 from 'web3';

let web3 = undefined;

if(process.browser){
    web3 = new Web3(window.web3.currentProvider);
}

export default web3;
