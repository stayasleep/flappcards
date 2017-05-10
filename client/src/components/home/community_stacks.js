import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCommunityStacksOverview, getStackOverview} from '../../actions/index'
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {subHeader} from '../utilities/stackSummaryStyle';
import StackSummary from '../utilities/renderStackSummary';

class Community extends Component {
    componentWillMount() {
        this.props.getCommunityStacksOverview();
    }
    render() {
        if (!this.props.communityStacks) {
            return (
                <List>
                    <Subheader style={subHeader}>Community Stacks</Subheader>
                    <div style={{fontFamily: "Roboto, sans-serif"}}>
                        Oops! Looks like you own all the community content!
                    </div>
                </List>
            )
        }

        return (
            <StackSummary cardStack={this.props.communityStacks} title={"Community Stacks"} />
        );
    }
}
function mapStateToProps(state) {
    return {
        communityStacks: state.stack.communityStacks
    }
}

export default connect(mapStateToProps, {getCommunityStacksOverview, getStackOverview})(Community);