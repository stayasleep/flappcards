import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCommunityStacksOverview, getStackOverview} from '../../actions/index'
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {subHeader} from '../utilities/stackSummaryStyle';
import StackSummary from '../utilities/renderStackSummary';
import Paper from 'material-ui/Paper';

class Community extends Component {
    componentWillMount() {
        console.log('community will mount');
        this.props.getCommunityStacksOverview();
    }
    render() {
        console.log('comm props',this.props);
        if (!this.props.communityStacks) { //if there is server error or commStack not defined
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

            <Paper className="communityPaper" zDepth={2}>
                <h2>FlappCards Random</h2>
                <p>Random stacks, each and every time</p>
                <StackSummary cardStack={this.props.communityStacks}  />
            </Paper>

        );
    }
}
function mapStateToProps(state) {
    return {
        communityStacks: state.stack.communityStacks
    }
}

export default connect(mapStateToProps, {getCommunityStacksOverview, getStackOverview})(Community);