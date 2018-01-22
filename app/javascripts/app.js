import { default as Web3} from 'web3';
import "./browser-solc.js";
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi;
var helloWorldContract;
var contractInstance;
var accounts;
var account;
var callback = 0;


window.App = 
{
  start: function() 
  {
    accounts = web3.eth.accounts;
    account = accounts[0];
    web3.eth.defaultAccount= account;
    BrowserSolc.getVersions(function(soljsonSources, soljsonReleases) {
     // console.log("browser solc getVersions");
     // console.log(soljsonReleases);
      });
    
  
   // first is truffle and second in solidity online
   // abi = JSON.parse('[{"constant":false,"inputs":[],"name":"getBalance","outputs":[{"name":"val","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amt","type":"uint256"}],"name":"addMoney","outputs":[{"name":"newValue","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
  // abi = JSON.parse('[ { "constant": true, "inputs": [], "name": "balance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "amt", "type": "uint256" } ], "name": "addMoney", "outputs": [ { "name": "newValue", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getBalance", "outputs": [ { "name": "val", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]');
   // helloWorldContract = web3.eth.contract(abi);
   // contractInstance = helloWorldContract.at('0x99b9f5ab5e85e1bd68da08488f52d77d1e7948c2');
  // contractInstance = helloWorldContract.at('0x657a440c3e8e1a433b7cc649cf3eaf385c6bdfbb');
  },
  createContract:function()
  {
    var helloWorldSource = "contract HelloWorld { uint public balance; function HelloWorld() { balance = 1000; } function addMoney(uint amt) returns (uint newValue) { balance += amt; return balance; } function getBalance() returns (uint val) { return balance; } }";
    
    BrowserSolc.loadVersion('soljson-v0.4.17+commit.bdeb9e52.js', function (compiler) {

      var helloWorldCompiled = compiler.compile(helloWorldSource, /*optimize:*/ 1);
      var contract = helloWorldCompiled.contracts[':HelloWorld'];
      var helloWorldAbi = JSON.parse(contract.interface);
      var helloWorldContract = web3.eth.contract(helloWorldAbi);
      var helloWorldCode = contract.bytecode;      
      helloWorldContract.new("", { from: account, data: helloWorldCode, gas: 4700000 }
      ,function (error, deployedContract) {
        var currentTime = new Date().getTime();
        callback +=1;
        console.log(callback);
        if(callback == 2)
        {
          console.log(deployedContract.address); 
          document.getElementById("contractAdd").value  =deployedContract.address;
          contractInstance = helloWorldContract.at(deployedContract.address);
         
        }    
        
      }
    );
      
    });
  },
  getBalance:function()
  {
    
    document.getElementById("balanceStatus").value = contractInstance.getBalance.call().toString();
  },

  addAmount:function () 
  {	
    contractInstance.addMoney(document.getElementById("addAmountId").value ,{from:web3.eth.accounts[0]});
    document.getElementById("balanceStatus").value = contractInstance.getBalance.call().toString();
  }
};

window.addEventListener('load', function() {
  App.start();
});


