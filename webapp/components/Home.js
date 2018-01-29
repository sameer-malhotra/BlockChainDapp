import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
import { Avatar, Chip, FlatButton, Subheader, TextField,
    SelectField, MenuItem, RaisedButton } from 'material-ui';
import SkillColors from '../util/SkillColors';
import {web3, contractInstance} from '../approot';
import { getEmployee1 } from '../util/BlockchainHelper';
import { getEmployee2 } from '../util/BlockchainHelper';
import { getEmployee3 } from '../util/BlockchainHelper';
import { getEmployee1Reputation } from '../util/BlockchainHelper';
import { getEmployee2Reputation } from '../util/BlockchainHelper';
import { getEmployee3Reputation } from '../util/BlockchainHelper';



export default class Home extends React.Component
 {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Michelle Bachler',
                    address: 0,
                    tokens: 0,
                    skills: [
                        {
                            displayName: 'Communication',
                            value: 14
                        },
                        {
                            displayName: 'Collaboration',
                            value: 0
                        },
                        {
                            displayName: 'Organisation',
                            value: 5
                        },
                        {
                            displayName: 'Ethics',
                            value: 10
                        },
                        {
                            displayName: 'Problem Solving',
                            value: 12
                        },
                        {
                            displayName: 'Engagement',
                            value: 9
                        }
                    ]
                },
                {
                    name: 'James Green',
                    address: 1,
                    tokens: 200,
                    skills: [
                        {
                            displayName: 'Communication',
                            value: 2
                        },
                        {
                            displayName: 'Collaboration',
                            value: 16
                        },
                        {
                            displayName: 'Organisation',
                            value: 4
                        },
                        {
                            displayName: 'Ethics',
                            value: 6
                        },
                        {
                            displayName: 'Problem Solving',
                            value: 5
                        },
                        {
                            displayName: 'Engagement',
                            value: 2
                        }
                    ]
                },
                {
                    name: 'Kevin Quick',
                    address: 2,
                    tokens: 200,
                    skills: [
                        {
                            displayName: 'Communication',
                            value: 19
                        },
                        {
                            displayName: 'Collaboration',
                            value: 3
                        },
                        {
                            displayName: 'Organisation',
                            value: 1
                        },
                        {
                            displayName: 'Ethics',
                            value: 3
                        },
                        {
                            displayName: 'Problem Solving',
                            value: 1
                        },
                        {
                            displayName: 'Engagement',
                            value: 1
                        }
                    ]                        
                }


            ],
            selectedValues: {}
        }
        this.initializeSelectedValues();
    }

    callbackEmployee1 = (error, returnValues) =>
    {   
       var stateTemp = this.state.data;
       stateTemp[0].tokens =returnValues.c[0];  
       this.setState({data:stateTemp});         
    }
    callbackEmployee2 = (error, returnValues) =>
    {   
         var stateTemp = this.state.data;
        stateTemp[1].tokens =returnValues.c[0];  
        this.setState({data:stateTemp});       
    }
    callbackEmployee3 = (error, returnValues) =>
    {       
        var stateTemp = this.state.data;
        stateTemp[2].tokens =returnValues.c[0];  
        this.setState({data:stateTemp});       
    }
    callbackEmployee1Rep = (error, returnValues) =>
    { 
        var stateTemp = this.state.data;   
        stateTemp[0].skills[0].value = returnValues[0].c[0];   
        stateTemp[0].skills[1].value = returnValues[1].c[0];
        stateTemp[0].skills[2].value = returnValues[2].c[0];
        stateTemp[0].skills[3].value = returnValues[3].c[0];
        stateTemp[0].skills[4].value = returnValues[4].c[0];
        stateTemp[0].skills[5].value = returnValues[5].c[0];   
        this.setState({data:stateTemp});
    }

    callbackEmployee2Rep = (error, returnValues) =>
    { 
        var stateTemp = this.state.data;   
        stateTemp[1].skills[0].value = returnValues[0].c[0];   
        stateTemp[1].skills[1].value = returnValues[1].c[0];
        stateTemp[1].skills[2].value = returnValues[2].c[0];
        stateTemp[1].skills[3].value = returnValues[3].c[0];
        stateTemp[1].skills[4].value = returnValues[4].c[0];
        stateTemp[1].skills[5].value = returnValues[5].c[0];   
        this.setState({data:stateTemp});
    }

    callbackEmployee3Rep = (error, returnValues) =>
    { 
        var stateTemp = this.state.data;   
        stateTemp[2].skills[0].value = returnValues[0].c[0];   
        stateTemp[2].skills[1].value = returnValues[1].c[0];
        stateTemp[2].skills[2].value = returnValues[2].c[0];
        stateTemp[2].skills[3].value = returnValues[3].c[0];
        stateTemp[2].skills[4].value = returnValues[4].c[0];
        stateTemp[2].skills[5].value = returnValues[5].c[0];   
        this.setState({data:stateTemp});
    }

    componentWillMount() {      
        getEmployee1(this.callbackEmployee1);
        getEmployee2(this.callbackEmployee2);
        getEmployee3(this.callbackEmployee3);
        getEmployee1Reputation(this.callbackEmployee1Rep);
        getEmployee2Reputation(this.callbackEmployee2Rep);
        getEmployee3Reputation(this.callbackEmployee3Rep);
    }

    initializeSelectedValues() {
        const selectedValues = {}
        this.state.data.forEach(member => {selectedValues[member.address] = {repCount: 0, toAddress: null, skill: null}});
        this.state = {...this.state, selectedValues};
        console.log(this.state);
    }

    get styles() {
        return {
            chip: {
                margin: '5px 10px',
                // borderWidth: '1px 7px',
                 borderRadius: 0,
                // borderStyle: 'solid'
            }
        }
    }

    renderSkills(skills, address) {       
        return (
            <Row style={{marginLeft: 6}}>
                {
                    skills.map(skill => (
                        
                        <Chip
                            backgroundColor= {SkillColors[skill.displayName]}
                            labelColor='#FFF'
                            key={`${address}_${skill.displayName}`} 
                            style={{...this.styles.chip, }}>
                            {<span>{skill.displayName} : <b>{skill.value}</b></span>}
                        </Chip>
                    ))
                }
            </Row>

        )
    }

    renderSkillsMenu(memberAddress) {
        const skills = ['Communication', 'Collaboration', 'Organisation', 'Ethics', 'Problem Solving', 'Engagement'];
        return skills.map(skill => (
            <MenuItem
                key={`${memberAddress}_${skill}`}
                insetChildren={true}
                value={skill}
                primaryText={skill}
            />
        ))
    }

    renderPersonSelect(memberAddress) {
        return this.state.data.filter(member => member.address !== memberAddress).map(member => (
            <MenuItem
                key={`${memberAddress}_${member.address}`}
                insetChildren={true}
                value={member.address}
                primaryText={member.name}
            />
        ));
    }

    handleToAddressSelect(memberAddress, toAddress) {
        let selectedValues = {...this.state.selectedValues};
        selectedValues[memberAddress].toAddress = toAddress;
        this.setState({selectedValues});
    }

    handleRepCountChange(memberAddress, repCount) {
        let selectedValues = {...this.state.selectedValues};
        selectedValues[memberAddress].repCount = repCount;
        this.setState({selectedValues});
    }

    handleSkillSelect(memberAddress, skill) {
        let selectedValues = {...this.state.selectedValues};
        selectedValues[memberAddress].skill = skill;
        this.setState({selectedValues});
    }

    handleSend(fromAddress, details) {  
        // ToDo engagement not working;
        var fromAcc = web3.eth.accounts[fromAddress];       
        var to = web3.eth.accounts[details.toAddress];
    
        var stateTemp = this.state.data;
      
        if(details.skill == "Communication")   
        {   
            contractInstance.transferCommunicationPoints(parseInt(fromAcc),parseInt(to),details.repCount, {from:fromAcc, gas:3000000});
            var tokenremain = contractInstance.getBalance(parseInt(fromAcc));
            stateTemp[fromAddress].tokens = tokenremain.c[0];
            var skillNewCount = contractInstance.getCommunicationPoints(parseInt(to));
            stateTemp[details.toAddress].skills[0].value = skillNewCount.c[0];
        }
       else if(details.skill == "Collaboration") 
        { 
             contractInstance.transferCollaborationPoints(parseInt(fromAcc),parseInt(to),details.repCount, {from:fromAcc, gas:47000});
             var tokenremain = contractInstance.getBalance(parseInt(fromAcc));
             stateTemp[fromAddress].tokens = tokenremain.c[0];
             var skillNewCount = contractInstance.getCollaborationPoints(parseInt(to));
             stateTemp[details.toAddress].skills[1].value = skillNewCount.c[0];
        }
       else if(details.skill == "Organisation") 
        {
            contractInstance.transferOrganisationPoints(parseInt(fromAcc),parseInt(to),details.repCount, {from:fromAcc, gas:47000});
            var tokenremain = contractInstance.getBalance(parseInt(fromAcc));
            stateTemp[fromAddress].tokens = tokenremain.c[0];
            var skillNewCount = contractInstance.getOrganisationPoints(parseInt(to));
            stateTemp[details.toAddress].skills[2].value = skillNewCount.c[0];
        }
        else if(details.skill == "Ethics") 
        {
            contractInstance.transferEthicsPoints(parseInt(fromAcc),parseInt(to),details.repCount, {from:fromAcc, gas:47000});
            var tokenremain = contractInstance.getBalance(parseInt(fromAcc));
            stateTemp[fromAddress].tokens = tokenremain.c[0];
            var skillNewCount = contractInstance.getEthicsPoints(parseInt(to));
            stateTemp[details.toAddress].skills[3].value = skillNewCount.c[0];
        }
        else if(details.skill == "Problem Solving") 
        {
            contractInstance.transferProblemSolvingPoints(parseInt(fromAcc),parseInt(to),details.repCount, {from:fromAcc, gas:47000});
            var tokenremain = contractInstance.getBalance(parseInt(fromAcc));
            stateTemp[fromAddress].tokens = tokenremain.c[0];
            var skillNewCount = contractInstance.getProblemSolvingPoints(parseInt(to));
            stateTemp[details.toAddress].skills[4].value = skillNewCount.c[0];
        }
        else if(details.skill == "Engagement") 
        {
            contractInstance.transferEngagementPoints(parseInt(fromAcc),parseInt(to),details.repCount, {from:fromAcc, gas:3000000});
            var tokenremain = contractInstance.getBalance(parseInt(fromAcc));
            stateTemp[fromAddress].tokens = tokenremain.c[0];           
            var skillNewCount = contractInstance.getEngagementPoints(parseInt(to));            
            stateTemp[details.toAddress].skills[5].value = skillNewCount.c[0]; 
        }
        this.setState({data:stateTemp});       
    }

   

    renderMembers(members) {
        return members.map(member => (
            <Card style={{margin: 15, padding: 10}} key={member.address}>
                <CardTitle
                    title={
                        <Row style={{width: '100%'}}>
                            <Avatar>{member.name[0]}</Avatar>
                            <Col xs={4}>
                                {member.name}
                            </Col>
                            <Col xsOffset={3} xs={4} style={{fontWeight: 500, textAlign: 'right'}}>
                                Tokens left: {member.tokens}
                            </Col>
                        </Row>
                    }
                    titleStyle= {{fontSize: 18}}
                    
                />
                <CardText style={{paddingTop: 0}}>
                    <Subheader>My Reputation</Subheader>
                    {this.renderSkills(member.skills)}
                    <span style={{color: '#9B9B9B', marginRight: 15, marginLeft: 15}}>Assign Reputation</span>
                    <TextField
                        defaultValue="0"
                        floatingLabelText="No. Tokens"
                        style={{width: 100}}
                        type='number'
                       // value={this.state.selectedValues[member.address].repCount}
                        onChange={(event, val) => this.handleRepCountChange(member.address, val)}
                    />
                    <SelectField
                        floatingLabelText="To"
                        value={this.state.selectedValues[member.address].toAddress}
                        onChange={(event, key, value) => this.handleToAddressSelect(member.address, value)}
                        //menuStyle={{margin: 'auto'}}
                        style={{marginLeft: 20, display:'inline-block', verticalAlign: 'bottom' }}
                        >
                        {this.renderPersonSelect(member.address)}
                    </SelectField>
                    
                    <SelectField
                        floatingLabelText="Skill"
                        value={this.state.selectedValues[member.address].skill}
                        onChange={(event, key, value) => this.handleSkillSelect(member.address, value)}
                        //menuStyle={{margin: 'auto'}}
                        style={{marginLeft: 20, display:'inline-block', verticalAlign: 'bottom' }}
                        >
                        {this.renderSkillsMenu(member.address)}
                    </SelectField>
                    <RaisedButton label="Send" primary={true} style={{marginLeft: 20}} 
                        onTouchTap={() => this.handleSend(member.address, this.state.selectedValues[member.address])}/>
            </CardText>
            </Card>
        ))
    }

    render () {
        
        return (
            <Grid>
                {this.renderMembers(this.state.data)}
            </Grid>
        )
    }
}