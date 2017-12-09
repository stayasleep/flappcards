import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import SnackBar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import RegisterForm from '../forms/register_form';
import LoginModal from '../../components/confirmActionModal/loginModal';
import LandingPageInfoText from '../../components/landingPage/landing_page_text';
import WhyFlappCards from '../../components/landingPage/whyFlapp';
import FlappFeatured from '../../components/landingPage/flapp_featured';
import Home from '../home/home';
import {getFeaturedStackOverview, initiateGuestBrowsing, resetAuthSession} from '../../actions/index';
import '../../components/styles/landing_page.css';
import requireAuth from '../../components/auth/require_auth';



class Landing extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router:PropTypes.object

    };
    componentWillMount() {
        // if they do not have a token, initiate the non-member browsing procedures
        !(localStorage.getItem('token')) ? (this.props.initiateGuestBrowsing('/')) : (browserHistory.push('/'));
    }

    componentWillReceiveProps(nextProps){
        console.log('landing received',nextProps);
        // if(nextProps.authorized !== this.props.authorized){
        //     if(nextProps.authorized){
        //         console.log('landing sending you home');
        //         this.context.router.push('/home');
        //
        //     }
        // }
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
        //consecutive visits youll have a token, so axios can happen asap, otherwise get token first and then do the call in above lifecycle
        if(this.props.authenticated && !this.props.authorized) {
            this.props.getFeaturedStackOverview();
        }
        if(this.props.authorized){
            this.context.router.push('/home');
        }

    }

    handleRequestClose(){
        this.props.resetAuthSession();
    }

    render(){
        console.log('landing rendered',this.props);
        const rightButtons = (
            <div className="loginModalContainerDiv">
                <LoginModal/>
            </div>
        );
        // const GetHome = requireAuth(Home);

        //returning user
        // if(this.props.authorized){
        //     return <Home/>;
        // }else {
            //guest or expired token directs to here
            return (
                <div className="landing-container">
                    <AppBar className="" title={<span className="title">FlappCards</span>} showMenuIconButton={false}
                            iconElementRight={rightButtons}
                    />
                    <Paper className="landingPageContentContainerDiv" zDepth={2}>
                        {/*User Greeting to the left*/}
                        <LandingPageInfoText/>
                        {/*Reuseable registration form that needs some styling to be used here*/}
                        <div style={{backgroundColor: "rgba(255,255,255,0.9",padding:"1em",flex:"1 1 0",boxShadow: "5px 5px 2.5px #888888"}}>
                            <RegisterForm/>
                        </div>
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
            );
        // }
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

