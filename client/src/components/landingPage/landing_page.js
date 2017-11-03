import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import SnackBar from 'material-ui/Snackbar';
import {initiateGuestBrowsing,resetAuthSession} from '../../actions/index';
import Registration from '../auth/registration';
import LoginModal from '../confirmActionModal/loginModal';
import LandingPageInfoText from './landing_page_text';
import {landingPageContentContainerDiv, landingPageContainerDiv, title} from '../styles/landing_page.css';

import WhyFlappCards from './whyFlapp';
import FlappFeatured from '../home/flapp_feat';
// import Home from '../home/home';
import Home from '../../containers/home/home';

class Landing extends Component {
    static contextTypes = {
        store: PropTypes.object
    };

    componentWillMount() {
        // if they do not have a token, initiate the non-member browsing procedures
        !(localStorage.getItem('token')) ? (this.props.initiateGuestBrowsing('/')) : (browserHistory.push('/'));
    }

    componentWillReceiveProps(nextProps){
        console.log('landing received',nextProps);
        !(localStorage.getItem("token")) ? nextProps.initiateGuestBrowsing('/') : null;
    }
    componentDidMount(){
        console.log('landing did',this.props);
    }
    handleRequestClose(){
        console.log('handling close request');
        this.props.resetAuthSession();
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
                            iconElementRight={rightButtons}
                    />
                    <Paper className="landingPageContentContainerDiv" zDepth={2}>
                        <LandingPageInfoText/>
                        <Registration/>
                    </Paper>
                    <WhyFlappCards />
                    { state.auth.authenticated ? (
                        <FlappFeatured/>
                        ) : null
                    }
                    {/* Above Conditional rendering prevents the uncaught promise from occurring*/}
                    {state.auth.sessionExp &&
                        <SnackBar
                            open={state.auth.sessionExp}
                            message={"Your session has expired, please log in!"}
                            autoHideDuration={6000}
                            onRequestClose={this.handleRequestClose.bind(this)}
                            action="Close"
                        />
                    }
                </div>
            );
        }
    }
}
function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated,
        authorized: state.auth.authorized,
        sessionExp: state.auth.sessionExp
    }
}
export default connect(mapStateToProps, {initiateGuestBrowsing, resetAuthSession})(Landing);
// export default connect(null, {initiateGuestBrowsing})(Landing);

