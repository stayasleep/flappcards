import React, {Component} from 'react';
import Registration from '../auth/registration';
import LoginModal from '../confirmActionModal/loginModal';
import LandingPageInfoText from './landing_page_text';
import {landingPageContentContainerDiv, landingPageContainerDiv, title} from '../styles/landing_page.css';
import AppBar from 'material-ui/AppBar';

import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {initiateGuestBrowsing} from '../../actions/index';

class Landing extends Component {


    componentDidMount() {

        // check to see if the user already has a token
        // if they do not have a token, initiate the non-member browsing procedures
        // if they do have a token, push the user to the home component
        !(localStorage.getItem('token')) ? (this.props.initiateGuestBrowsing()) : (browserHistory.push('/home')); //if token = guest...then display recent stacks should not occur?
    }
    render (){
        const rightButtons=(
            <div className="loginModalContainerDiv">
                <LoginModal/>
            </div>
        );

        return (
            <div className="landingPageContainerDiv">
                <AppBar className="header" title={<span className="title">FlappCards</span>} showMenuIconButton={false} iconElementRight={rightButtons}  />
                <div className="landingPageContentContainerDiv">
                    <Registration/>
                    <LandingPageInfoText/>
                </div>
            </div>
        )
    }
}


export default connect(null, {initiateGuestBrowsing})(Landing);

