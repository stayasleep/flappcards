import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form'
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LoginForm from '../../components/forms/login_form'
import { resetAuthError, userLogin } from '../../actions/index';
import RecoverPW from '../../components/confirmActionModal/recoverPW';


class Login extends Component {
    static contextTypes={
        router:PropTypes.object
    };
    constructor(props){
        super(props);
        this.state={
            windowWidth: window.innerWidth,
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount(){
        //if logged in from prev visit, push them home
        document.title="FlappCards - Sign In";
        if(this.props.authorized){
            this.context.router.push('/home');
        }
    }
    componentWillUnmount(){
        //clear any errors that may have existed as you navigate away
        if(this.props.loginErr){
            this.props.resetAuthError();
        }
        console.log('unmounting from login container');
    }

    handleLogin(values){
        let credentials = {...values, userName: values.userName.trim()};
        console.log('login form values',credentials);
        this.props.userLogin(credentials);
    }

    render(){
        console.log('login page render',this.props);
        const {windowWidth} = this.state;
        const {handleSubmit, submitting} = this.props;
        return(
            <div className="login-container">
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<Link className="navTitleBar" to="/">FlappCards</Link>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Paper  className="paperBody loginComponentOnly" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">Log in to FlappCards</h1>
                        <div id="loginForm">
                            { this.props.loginErr &&
                            <div style={{"color": "red"}}>{this.props.loginErr}</div>
                            }
                        </div>
                        <LoginForm
                            handleSubmit={handleSubmit}
                            fullBar={windowWidth<=480}
                            onHandleFormSubmit={this.handleLogin}
                            submitting={submitting}
                        />

                        {/*If the login_page & log_form combined so dialog could use it, then perhaps create new login_route and use props.children and we can
                         import this page while passing Recover in there for the route, and not pass RecoverPW for dialog
                         */}

                        {/*Large Screens served Dialog, small screens we send to dedicated route*/}
                        {windowWidth > 480 ?
                            <RecoverPW/>
                            :
                            <Link className="forgotLink" to="/login/forgotpassword" style={{color:"teal"}}>Forgot Password?</Link>
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

function validate(values){
    const errors = {};

    const requiredFields = ['userName','password'];
    requiredFields.forEach(field=>{
        if (!values[field]){
            errors[field] = `Required`
        }else if(field === 'userName' && /^\s+$/.test(values[field])){
            errors[field] = 'Username must contain a value';
        }
    });
    return errors;
}

function mapStateToProps(state){
    return {
        authorized: state.auth.authorized,
        loginErr: state.auth.authError,

    }
}

Login = reduxForm({
    form: 'login',
    validate
})(Login);

export default connect(mapStateToProps,{resetAuthError, userLogin})(Login);