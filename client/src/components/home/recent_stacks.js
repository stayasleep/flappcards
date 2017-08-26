import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Subheader from 'material-ui/Subheader';
import {List} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {getMyRecentStacksOverview, getStackOverview} from '../../actions/index'
import {subHeader} from '../utilities/stackSummaryStyle';
import {emptyRecent} from './../styles/home.css';
import StackSummary from '../utilities/renderStackSummary';

class Recent extends Component {
    componentWillMount() {
        this.props.getMyRecentStacksOverview();
    }

    render() {
        if(this.props.authorized) {
            if (!this.props.recentStacks || typeof this.props.recentStacks === "string" ) { //ugly, but it catches our promise which originally returns a string,this only worked before bc the dispatch in catch threw it back and saved us
                return (
                    <List>
                        <Subheader style={subHeader}>Recent Stacks:</Subheader>
                        <div className="emptyRecent" style={{fontFamily: "Roboto, sans-serif"}}>
                            Oops! Looks like your shelf is empty. <Link to="/createCards">Create a stack</Link> or take
                            a look at some of the community content below!
                        </div>
                    </List>
                )
            } else if (this.props.recentStacks.success === false){
                return (
                    <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif"}}>
                        <CircularProgress size={80} thickness={6} />
                    </div>
                )
            } else if (this.props.recentStacks) {
                return (
                    <StackSummary cardStack={this.props.recentStacks} title={"Recent Stacks"} />
                );
            }
        }else{
            return null;
        }

    }
}
function mapStateToProps(state) {
    return {
        authorized: state.auth.authorized, //ask andres: if authorized, render recent_stack o/w do not render
        recentStacks: state.stack.recentStacks
    }
}

export default connect(mapStateToProps, {getMyRecentStacksOverview, getStackOverview})(Recent);
