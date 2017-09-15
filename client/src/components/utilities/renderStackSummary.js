import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';
import {subHeader, cardHeader, cardActions, cardText, stackSummaryDisplay} from './stackSummaryStyle';
import {medium, mediumIcon, rightAvatar} from '../utilities/stackSummaryStyle';


// When using the component, you'll pass in the name of the cardStack that is in this.props
class StackSummary extends Component {

    render() {
        const {cardStack, title} = this.props;
        const stackSummary = cardStack.map((item, index) => {

            function handleClick(){
                browserHistory.push(`/stackoverview/${cardStack[index].stack_id}`)
            }

            return (
                <Card zDepth={3} onClick={handleClick} key={index} className={`card${index}`} style={stackSummaryDisplay}>
                        <style>
                            {`
                            .card${index}{
                                cursor: pointer;
                                border: 2px solid black;
                            }
                            .card${index}:hover{
                                box-shadow: 10px 10px 5px #888888 !important;
                            }
                            `}
                        </style>

                    <CardHeader
                        title={`Subject: ${item.subject}`}
                        titleStyle={cardHeader}
                        subtitleStyle={cardHeader}
                        subtitle={`Category: ${item.category}`}
                        avatar={<Avatar style={rightAvatar} src={`data:image/jpeg;base64,${item.avatar}`} crossOrigin="Anonymous" alt={`user-avatar-${item.avatar}`}/>}
                        style={cardHeader}

                    />
                    <CardText
                        style={cardText}
                    >
                        <div>
                        Created by: {item.createdBy}
                        </div>
                        <div>
                        Total Cards: {item.totalCards}
                        </div>
                        <div>
                        Created On: {item.createdOn}
                        </div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className="viewEye">
                            <IconButton iconStyle={mediumIcon} name={"view-stack-icon"} style= {medium} >
                                <RemoveRedEye hoverColor={green500} />

                            </IconButton>
                            {item.stackRating}
                        </div>
                    </CardText>
                    {/*<CardActions>*/}
                        {/*<IconButton iconStyle={mediumIcon} style= {medium} containerElement={<Link to={`/stackOverview/${cardStack[index].stack_id}`} name="stackOverview"/>}>*/}
                            {/*<RemoveRedEye hoverColor={green500} />*/}
                        {/*</IconButton>*/}
                    {/*</CardActions>*/}
                </Card>
            )
        });

        return (
            <div>
                <Subheader style={subHeader}>{title}</Subheader>
                <List>
                    {stackSummary}
                </List>
            </div>
        )
    }
}

export default StackSummary;