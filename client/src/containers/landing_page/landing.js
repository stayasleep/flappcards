import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import SnackBar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import Registration from '../../components/auth/registration';
import LoginModal from '../../components/confirmActionModal/loginModal';
import LandingPageInfoText from '../../components/landingPage/landing_page_text';
import WhyFlappCards from '../../components/landingPage/whyFlapp';
import FlappFeatured from '../../components/landingPage/flapp_featured';
import Home from '../home/home';
import {getFeaturedStackOverview, initiateGuestBrowsing, resetAuthSession} from '../../actions/index';
import '../../components/styles/landing_page.css';


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
        //log out, you need a guest token now
        !(localStorage.getItem("token")) ? nextProps.initiateGuestBrowsing('/') : null;
        //new users get token and then we can begin axios for featured stack since it wont return a fail
        //returning users will not meet the criteria below
        if(nextProps.authenticated !== this.props.authenticated){
            if(nextProps.authenticated && !nextProps.authorized){
                this.props.getFeaturedStackOverview();
            }
        }
    }
    componentDidMount(){
        //consecutive visits youll have a token, so axios can happen asap, otherwise get token first
        if(this.props.authenticated && !this.props.authorized) {
            this.props.getFeaturedStackOverview();
        }
    }

    handleRequestClose(){
        console.log('handling close request');
        this.props.resetAuthSession();
    }

    render(){
        console.log('landing rendered',this.props);
        const rightButtons = (
            <div className="loginModalContainerDiv">
                <LoginModal/>
            </div>
        );

        //returning user
        if(this.props.authorized){
            return <Home/>;
        }else {
            //guest or new user
            return (
                <div className="landing-container">
                    <AppBar className="" title={<span className="title">FlappCards</span>} showMenuIconButton={false}
                            iconElementRight={rightButtons}
                    />
                    <Paper className="landingPageContentContainerDiv" zDepth={2}>
                        <LandingPageInfoText/>
                        <Registration/>
                    </Paper>
                    <WhyFlappCards/>

                    {/*Initial Visit: Token wont be processed yet and FlappFeat still mounts, a conditional lets it mount on
                    token acquisition as to prevent unsuccessful axios calls without initial token
                    */}
                    {this.props.authenticated &&
                        <FlappFeatured
                            featured={this.props.featured}
                            featuredErr={this.props.featuredErr}
                        />
                    }


                    {/*Token redirects due to expiration*/}
                    {this.props.sessionExp &&
                    <SnackBar
                        open={this.props.sessionExp}
                        message={"Your session has expired, please log in!"}
                        autoHideDuration={6000}
                        onRequestClose={this.handleRequestClose.bind(this)}
                        action="Close"
                    />
                    }
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated,
        authorized: state.auth.authorized,
        sessionExp: state.auth.sessionExp,
        featured: state.stack.featStack,
        featuredErr: state.stack.featErr,
    }
}

export default connect(mapStateToProps, {getFeaturedStackOverview, initiateGuestBrowsing, resetAuthSession})(Landing);

