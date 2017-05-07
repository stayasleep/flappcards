import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux';
import {getMyRecentStacksOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';

class Recent extends Component {
    componentWillMount() {
        this.props.getMyRecentStacksOverview();
    }

    viewStack(stackInfo) {
        console.log("stackID", stackInfo);
        this.props.getStackOverview(stackInfo.stack_id);

    }

    render() {
        if (!this.props.recentStacks) {
            return <div>Loading</div>
        }
        const recentStacksList = this.props.recentStacks.map((item, index) => {
            return (
                <Card key={index}>
                    <CardHeader
                        title={item.subject}
                        subtitle={item.category}
                    />
                    <CardText>
                        Created by: {item.createdBy}
                        Total Cards: {item.totalCards}
                        {item.createdOn}
                        {item.stackRating}
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            containerElement={<Link to="/stackOverview" name="stackOverview"/>}
                            onClick={() => {this.viewStack(this.props.recentStacks[index])}}>
                            View
                        </RaisedButton>
                    </CardActions>
                </Card>
            )
        });
        return (
            <div>
                {recentStacksList}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        recentStacks: state.stack.recentStacks
    }
}

export default connect(mapStateToProps, {getMyRecentStacksOverview, getStackOverview})(Recent);