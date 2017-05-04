import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {connect} from 'react-redux';
import {getMyRecentStacksOverview} from '../../actions/index'
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
                    {item.createdBy}
                    {item.createdOn}
                    {item.stackRating}
                </li>
            )
        });
        return (
            <div>
            <ul>
            {recentStacksList}
            </ul>
                <Link to="/stackOverview" name="SingleCard"><button className="mdl-button mdl-js-button mdl-button--primary">
                    <i className="material-icons">visibility</i>
                </button></Link>
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