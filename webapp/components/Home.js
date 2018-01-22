import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
import { Avatar, Chip, FlatButton, Subheader, TextField } from 'material-ui';
import SkillColors from '../util/SkillColors';


export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Michelle Bachler',
                    address: 1,
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


            ]
        }
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
            <Row>
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

    renderMembers(members) {
        return members.map(member => (
            <Card style={{margin: 15}} key={member.address}>
                <CardHeader
                title={member.name}
                avatar={<Avatar>{member.name[0]}</Avatar>}
                />
                <CardText style={{paddingTop: 0}}>
                    <Subheader>My Reputation</Subheader>
                    {this.renderSkills(member.skills)}
                    <span style={{color: '#9B9B9B', marginRight: 15}}>Assign Reputation</span>
                    <TextField
                        defaultValue="0"
                        floatingLabelText="No. Tokens"
                    />
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