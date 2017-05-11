import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getStackOverview} from '../../actions/index'; // need connect for action creator
import {subHeader, cardHeader, cardActions, cardText, stackSummaryDisplay} from './stackSummaryStyle';
// When using the component, you'll pass in the name of the cardStack that is in this.props
class StackSummary extends Component {

    viewStack(stackInfo) {
        console.log("stackID", stackInfo);
        this.props.getStackOverview(stackInfo.stack_id);
    }
    render() {
        const {cardStack, title} = this.props;
        const stackSummary = cardStack.map((item, index) => {
            return (

                <Card key={index} style={stackSummaryDisplay}>
                    <CardHeader
                        title={`Subject: ${item.subject}`}
                        subtitle={`Category: ${item.category}`}
                        avatar={<Avatar>{item.totalCards}</Avatar>}
                        style={cardHeader}
                        actAsExpander={true}
                    />
                    <CardText
                        style={cardText}
                        expandable={true}
                    >
                        Created by: {item.createdBy}
                        Total Cards: {item.totalCards}
                        Created On: {item.createdOn}
                        Rating: {item.stackRating}
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            containerElement={<Link to={`/stackOverview/${cardStack[index].stack_id}`}
                                                    name="stackOverview"/>}
                            onClick={() => {
                                this.viewStack(cardStack[index])
                            }}>
                            View
                        </RaisedButton>
                    </CardActions>
                </Card>
            )
        });

        return (
            <List>
                <Subheader style={subHeader}>{title}</Subheader>
                {stackSummary}
            </List>
        )
    }
}

export default connect(null,{getStackOverview})(StackSummary);