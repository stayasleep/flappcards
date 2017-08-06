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
import Community from '../home/community_stacks'; //state needs to come higher for this to work or simply a new component and function
import Home from '../home/home';
import PropTypes from 'prop-types';

class Landing extends Component {
    static contextTypes = {
        store: PropTypes.object
    };

    componentDidMount() {
        // if they do not have a token, initiate the non-member browsing procedures
        console.log('landing did mount',this.props);
        !(localStorage.getItem('token')) ? (this.props.initiateGuestBrowsing('/')) : (browserHistory.push('/'));
    }
    render () {
        const props = this.props;
        const {store} =this.context;
        const state= store.getState(); //this is a very round about way to accomplish this task

        const rightButtons = (
            <div className="loginModalContainerDiv">
                <LoginModal/>
            </div>
        );
        //if they are a real user, they wont see the same welcome screen and such..once this can see the state it works
        if (state.auth.authorized) {
            return (
                <Home/>
            )
        } else {
            return (
                <div className="">
                    <AppBar className="" title={<span className="title">FlappCards</span>} showMenuIconButton={false}
                            iconElementRight={rightButtons}/>
                    <Paper className="landingPageContentContainerDiv" zDepth={2}>
                        <LandingPageInfoText/>
                        <Registration/>
                    </Paper>
                    <WhyFlappCards />
                    <Community />
                </div>
            );
        }
    }
}

// export default connect(mapStateToProps,{initiateGuestBrowsing})(Landing); //when this is uncommented, things break. Just want to see state at start of app

export default connect(null, {initiateGuestBrowsing})(Landing);

