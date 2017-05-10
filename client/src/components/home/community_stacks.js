import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux';
import {getCommunityStacksOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class Community extends Component {
    componentWillMount() {
        this.props.getCommunityStacksOverview();
    }

    viewStack(stackInfo) {
        console.log("stackID", stackInfo);
        this.props.getStackOverview(stackInfo.stack_id);

    }

    render() {
        const styles = {
            subHeader: {
                textAlign: "center",
                fontSize: "2em",
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
                paddingLeft: 0
            },
            cardHeader: {
                fontSize: "1em",
                fontWeight: "bold"
            },
            cardActions: {
                position: "relative",
                display: "inline-flex",
                float: "right",
                marginRight: "1em"
            },
            cardText : {
                fontSize: "1em"
            },
            cardDisplay: {
                marginTop: "1em",
                marginBottom: "1em"
            }
        };

        if (!this.props.communityStacks) {
            return (
                <List>
                    <Subheader style={styles.subHeader}>Community Stacks</Subheader>
                    <div>
                        Oops! Looks like you own all the community content!
                    </div>
                </List>
            )
        }
        const communityStacksList = this.props.communityStacks.map((item, index) => {
            return (
                <Card key={index} style={styles.cardDisplay}>
                    <CardHeader
                        title={item.subject}
                        subtitle={item.category}
                        style={styles.cardHeader}
                    />
                    <CardActions>
                        <RaisedButton
                            containerElement={<Link to={`/stackOverview/${this.props.communityStacks[index].stack_id}`} name="stackOverview"/>}
                            onClick={() => {this.viewStack(this.props.communityStacks[index])}}>
                            View
                        </RaisedButton>
                    </CardActions>
                    <CardText>
                        Created by: {item.createdBy}
                        Total Cards: {item.totalCards}
                        Last Played: {item.lastPlayed}
                        Rating: {item.stackRating}
                    </CardText>
                </Card>
            )
        });
        return (
            <List>
                <Subheader style={styles.subHeader}>Community Stacks</Subheader>
                {communityStacksList}
            </List>
        );
    }
}
function mapStateToProps(state) {
    return {
        communityStacks: state.stack.communityStacks
    }
}

export default connect(mapStateToProps, {getCommunityStacksOverview, getStackOverview})(Community);