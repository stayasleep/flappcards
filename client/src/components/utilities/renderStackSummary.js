import React, {Component} from 'react';
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import {Link} from 'react-router';

import {subHeader, cardHeader, cardActions, cardText, stackSummaryDisplay} from './stackSummaryStyle';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';
import {medium, mediumIcon, rightAvatar} from '../utilities/stackSummaryStyle';
// When using the component, you'll pass in the name of the cardStack that is in this.props
class StackSummary extends Component {

    render() {
        const {cardStack, title} = this.props;
        const stackSummary = cardStack.map((item, index) => {
            return (

                <Card key={index} style={stackSummaryDisplay}>
                    <CardHeader
                        title={`Subject: ${item.subject}`}
                        titleStyle={cardHeader}
                        subtitleStyle={cardHeader}
                        subtitle={`Category: ${item.category}`}
                        avatar={<Avatar style={rightAvatar} src={`data:image/jpeg;base64,${item.avatar}`} crossOrigin="Anonymous"/>}
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
                        <div>
                            {`Rating: ${item.stackRating} %`}
                        </div>
                    </CardText>
                    <CardActions>
                        <IconButton iconStyle={mediumIcon} style= {medium} containerElement={<Link to={`/stackOverview/${cardStack[index].stack_id}`} name="stackOverview"/>}>
                            <RemoveRedEye hoverColor={green500} />
                        </IconButton>
                    </CardActions>
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