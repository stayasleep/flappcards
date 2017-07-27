import React, {Component} from 'react';
import Registration from '../auth/registration';
import LoginModal from '../confirmActionModal/loginModal';
import LandingPageInfoText from './landing_page_text';
import {landingPageContentContainerDiv, landingPageContainerDiv, title} from '../styles/landing_page.css';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {initiateGuestBrowsing} from '../../actions/index';

import WhyFlappCards from '../home/whyFlapp';
import Community from '../home/community_stacks'; //this doesnt work thoooo

class Landing extends Component {


    componentWillMount() {

        // check to see if the user already has a token
        // if they do not have a token, initiate the non-member browsing procedures
        // if they do have a token, push the user to the home component
        !(localStorage.getItem('token')) ? (this.props.initiateGuestBrowsing()) : (browserHistory.push('/')); //if token = guest...then display recent stacks should not occur? Well I removed 'home' and it works better now..
    }
    render (){
        console.log('props',this.props);
        const rightButtons=(
            <div className="loginModalContainerDiv">
                <LoginModal/>
            </div>
        );

        return (
            <div className="">
                <AppBar className="" title={<span className="title">FlappCards</span>} showMenuIconButton={false} iconElementRight={rightButtons}  />
                <Paper className="landingPageContentContainerDiv" zDepth={2}>
                    <LandingPageInfoText/>
                    <Registration/>
                </Paper>
                <WhyFlappCards />
                <Community />
            </div>
        )
    }
}


export default connect(null, {initiateGuestBrowsing})(Landing);

