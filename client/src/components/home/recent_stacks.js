import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux';
import {getMyRecentStacksOverview} from '../../actions/index'
import {Link} from 'react-router'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card';

class Recent extends Component {
    componentWillMount() {
        this.props.getMyRecentStacksOverview();
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
                        {item.totalCards}
                        {item.createdBy}
                        item.createdOn}
                        item.stackRating}
                    </CardText>
                    <CardActions>
                        <Link to="/stackOverview" name="SingleCard"><RaisedButton>
                            <i className="material-icons">visibility</i>
                        </RaisedButton></Link>
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

export default connect(mapStateToProps, {getMyRecentStacksOverview})(Recent);