import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux';
import {getCommunityStacksOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';

class Community extends Component {
    componentWillMount() {
        this.props.getCommunityStacksOverview();
    }

    viewStack(stackInfo) {
        console.log("stackID", stackInfo);
        this.props.getStackOverview(stackInfo.stack_id);

    }

    render() {
        if (!this.props.communityStacks) {
            return (
                <div>
                    <h1>Community Stacks:</h1>
                    <div>
                        Oops! Looks like you own all the community content!
                    </div>
                </div>
            )
        }
        const communityStacksList = this.props.communityStacks.map((item, index) => {
            return (
                <Card key={index}>
                    <CardHeader
                        title={item.subject}
                        subtitle={item.category}
                    />
                    <CardText>
                        Created by: {item.createdBy}
                        Total Cards: {item.totalCards}
                        Created On: {item.createdOn}
                        {item.stackRating}
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            containerElement={<Link to="/stackOverview" name="stackOverview"/>}
                            onClick={() => {this.viewStack(this.props.communityStacks[index])}}>
                            View
                        </RaisedButton>
                    </CardActions>
                </Card>
            )
        });
        return (
            <div>
                <h1>Community Stacks:</h1>
                {communityStacksList}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        communityStacks: state.stack.communityStacks
    }
}

export default connect(mapStateToProps, {getCommunityStacksOverview, getStackOverview})(Community);