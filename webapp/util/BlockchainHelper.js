import {web3, reputationContract, contractInstance} from '../approot';


export function getEmployee1(abc) {   
    console.log(web3.eth.accounts[0]    );
    contractInstance.getEmployeeByAddress(parseInt(web3.eth.accounts[0]), abc)
    contractInstance.transferCollaborationPoints(parseInt(web3.eth.accounts[0]),parseInt(web3.eth.accounts[1]),1);
}

export function getEmployee2(abc) {   
    console.log(web3.eth.accounts[1]);
    contractInstance.getEmployeeByAddress(parseInt(web3.eth.accounts[1]), abc)
}

export function getEmployee3(abc) {   
    console.log(web3.eth.accounts[2]);
    contractInstance.getEmployeeByAddress(parseInt(web3.eth.accounts[2]), abc)
}

export function getEmployee1Reputation(abc) {   
    contractInstance.getEmployeeReputation(parseInt(web3.eth.accounts[0]), abc)
}