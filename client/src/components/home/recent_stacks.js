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
        console.log('am recent stack',this.props);
        if(this.props.authorized) {
            if (!this.props.recentStacks || typeof this.props.recentStacks==="string" ) { //ugly, but it catches our promise which originally returns a string,this only worked before bc the dispatch in catch threw it back and saved us
                console.log('recent stacks prop check',this.props.recentStacks);
                return (
                    <List>
                        <Subheader style={subHeader}>Recent Stacks:</Subheader>
                        <div className="emptyRecent" style={{fontFamily: "Roboto, sans-serif"}}>
                            Oops! Looks like your shelf is empty. <Link to="/createCards">Create a stack</Link> or take
                            a look at some of the community content below!
                        </div>
                    </List>
                )
            }else {
                return (
                    <StackSummary cardStack={this.props.recentStacks} title={"Recent Stacks"}/>
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
