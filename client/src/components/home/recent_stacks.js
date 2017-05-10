import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux';
import {getMyRecentStacksOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import {List} from 'material-ui/List';

class Recent extends Component {
    componentWillMount() {
        this.props.getMyRecentStacksOverview();
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
                paddingLeft: 0,
                marginTop: "1em"
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
            cardText: {
                fontSize: "1em"
            },
            cardDisplay: {
                marginTop: "1em",
                marginBottom: "1em"
            }
        };

        if (!this.props.recentStacks) {
            return (
                <List>
                    <Subheader style={styles.subHeader}>Recent Stacks:</Subheader>
                    <div>
                        Oops! Looks like your shelf is empty. Create a stack or take a took at some community content below!
                    </div>
                </List>
            )
        }
        const recentStacksList = this.props.recentStacks.map((item, index) => {
            return (
                    <Card key={index} style={styles.cardDisplay}>
                        <CardHeader
                            title={item.subject}
                            subtitle={item.category}
                            style={styles.cardHeader}
                        />
                        <CardText>
                            Created by: {item.createdBy}
                            Total Cards: {item.totalCards}
                            Created On: {item.createdOn}
                            Rating: {item.stackRating}
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                containerElement={<Link to={`/stackOverview/${this.props.recentStacks[index].stack_id}`} name="stackOverview"/>}
                                onClick={() => {this.viewStack(this.props.recentStacks[index])}}>
                                View
                            </RaisedButton>
                        </CardActions>
                    </Card>
            )
        });
        return (
            <List>
                <Subheader style={styles.subHeader}>Recent Stacks</Subheader>
                {recentStacksList}
            </List>
        );
    }
}
function mapStateToProps(state) {
    return {
        recentStacks: state.stack.recentStacks
    }
}

export default connect(mapStateToProps, {getMyRecentStacksOverview, getStackOverview})(Recent);