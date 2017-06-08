import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyRecentStacksOverview, getStackOverview} from '../../actions/index'
import Subheader from 'material-ui/Subheader';
import {List} from 'material-ui/List';
import {subHeader} from '../utilities/stackSummaryStyle';
import {Link} from 'react-router';
import {emptyRecent} from './../styles/home.css';

import StackSummary from '../utilities/renderStackSummary';

class Recent extends Component {
    componentWillMount() {
        this.props.getMyRecentStacksOverview();
    }

    render() {
        if (!this.props.recentStacks) {
            return (
                <List>
                    <Subheader style={subHeader}>Recent Stacks:</Subheader>
                    <div className="emptyRecent" style={{fontFamily: "Roboto, sans-serif"}}>
                        Oops! Looks like your shelf is empty. <Link to="/createCards">Create a stack</Link> or take a look at some of the community content below!
                    </div>
                </List>
            )
        }
        return (
                <StackSummary cardStack={this.props.recentStacks} title={"Recent Stacks"} />
        );
    }
}
function mapStateToProps(state) {
    return {
        recentStacks: state.stack.recentStacks
    }
}

export default connect(mapStateToProps, {getMyRecentStacksOverview, getStackOverview})(Recent);