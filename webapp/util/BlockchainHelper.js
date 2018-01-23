import {web3, reputationContract, contractInstance} from '../approot';


export function getEmployees() {
    contractInstance.getEmployeeByAddress(0x595a4901d54c49288ae2d2b6ecd730ee8dec0856, function(error, returnValues){
        console.log("return");
        console.log(returnValues[0]);
        console.log(returnValues[1]);
        console.log(returnValues[2]);
      })
}