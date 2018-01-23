import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
import { Avatar, Chip, FlatButton, Subheader, TextField,
    SelectField, MenuItem, RaisedButton } from 'material-ui';
import SkillColors from '../util/SkillColors';
import { getEmployees } from '../util/BlockchainHelper';


export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Michelle Bachler',
                    address: 1,
                    tokens: 100,
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
                    address: 2,
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
                    address: 3,
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

    componentWillMount() {
        getEmployees();
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
        const skills = ['Communication', 'Collaboration', 'Organisation', 'Ethics', 'Problem Solving', 'Engagemnent'];
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
        console.log({
            ...details,
            fromAddress
        });
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