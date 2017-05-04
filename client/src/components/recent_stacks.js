import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {connect} from 'react-redux';
import {getMyRecentStacksOverview} from '../actions/index'
import {Link} from 'react-router'

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
                <li key={index}>
                    {item.subject}
                    {item.category}
                    {item.totalCards}
                    {item.creator}
                    {item.created}
                    {item.rating}
                </li>
            )
        });
        return (
            <ul>
            {recentStacksList}
            </ul>
        );
    }
}
function mapStateToProps(state) {
    return {
        recentStacks: state.stack.recentStacks
    }
}

export default connect(mapStateToProps, {getMyRecentStacksOverview})(Recent);