import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import rootSaga from './sagas/index';
import {syncHistoryWithStore} from 'react-router-redux';
// import your components
import Main from './components/Main';
import LandingContainer from './components/landing/LandingContainer';
import Home from './components/Home';
import 'Styles/root.css';

import { default as Web3} from 'web3';
export let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
export let abi = [{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getEmployeeByAddress","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getOrganisationPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"value","type":"uint32"}],"name":"transferCollaborationPoints","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"value","type":"uint32"}],"name":"transferProblemSolvingPoints","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getEthicsPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"employeeAccts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"value","type":"uint32"}],"name":"transferEthicsPoints","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getProblemSolvingPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getEngagementPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_firstName","type":"string"},{"name":"_lastName","type":"string"}],"name":"createEmployee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getEmployeeReputation","outputs":[{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"value","type":"uint32"}],"name":"transferCommunicationPoints","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getCommunicationPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"value","type":"uint32"}],"name":"transferEngagementPoints","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getCollaborationPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"employeeList","outputs":[{"name":"firstName","type":"string"},{"name":"lastName","type":"string"},{"name":"balanceOfReputation","type":"uint256"},{"name":"communication","type":"uint32"},{"name":"collaboration","type":"uint32"},{"name":"organisation","type":"uint32"},{"name":"ethics","type":"uint32"},{"name":"problemSolvingSkill","type":"uint32"},{"name":"engagement","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"value","type":"uint32"}],"name":"transferOrganisationPoints","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
  
export let reputationContract = web3.eth.contract(abi);
export let contractInstance = reputationContract.at('0x880cb3905aa5c2a4ac27bba3676c07f418cb0169');


injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
store.runSaga(rootSaga);

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Main}>
        <IndexRoute component={Home}/>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);
