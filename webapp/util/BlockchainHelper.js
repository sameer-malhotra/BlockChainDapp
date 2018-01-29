import {web3, reputationContract, contractInstance} from '../approot';


export function getEmployee1(callBack) { 
     contractInstance.getBalance(parseInt(web3.eth.accounts[0]), callBack)    
}

export function getEmployee2(callBack) {  
     contractInstance.getBalance(parseInt(web3.eth.accounts[1]), callBack)
}

export function getEmployee3(callBack) { 
    contractInstance.getBalance(parseInt(web3.eth.accounts[2]), callBack)
}

export function getEmployee1Reputation(callBack) {   
    contractInstance.getEmployeeReputation(parseInt(web3.eth.accounts[0]), callBack)
}

export function getEmployee2Reputation(callBack) {   
    contractInstance.getEmployeeReputation(parseInt(web3.eth.accounts[1]), callBack)
}

export function getEmployee3Reputation(callBack) {   
    contractInstance.getEmployeeReputation(parseInt(web3.eth.accounts[2]), callBack)
}



