import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import renderInput from '../../components/utilities/renderInputStackOV';
import { resetAuthError, userLogin } from '../../actions/index';


class LoginForm extends Component {
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

    componentWillUnmount(){
        //clear any errors that may have existed as you navigate away
        if(this.props.loginErr){
            this.props.resetAuthError();
        }
    }

    handleLogin(values){
        let credentials = {...values, username: values.username.trim()};
        this.props.userLogin(credentials);
    }

    render(){
        const {windowWidth} = this.state;
        const {handleSubmit, submitting} = this.props;

        return(
            <div>
                <div id="loginForm">
                    {this.props.loginErr &&
                        <div style={{"color": "red"}}>{this.props.loginErr}</div>
                    }
                </div>
                <div className="login-form">
                    <form onSubmit={handleSubmit((values)=> {this.handleLogin(values)})}>
                        <div className="fieldContainer">
                            <Field name="username" className="login-field1 chromeAuto" component={renderInput} label="Username"/>
                            <Field name="password" className="login-field2 chromeAuto" component={renderInput} label="Password" type="password"/>
                        </div>
                        <div className="logResetContainer">
                            <RaisedButton primary={true} type="submit" label="Login" disabled={submitting} fullWidth={windowWidth<=480} />
                        </div>
                    </form>
                </div>
                {this.props.children}
            </div>
        )
    }
}

function validate(values){
    const errors = {};

    const requiredFields = ['username','password'];
    requiredFields.forEach(field=>{
        if (!values[field]){
            errors[field] = `Required`
        }else if(field === 'username' && /^\s+$/.test(values[field])){
            errors[field] = 'Username must contain a value';
        }
    });
    return errors;
}

function mapStateToProps(state){
    return {
        loginErr: state.auth.authError,
    }
}

LoginForm = reduxForm({
    form: 'login',
    validate
})(LoginForm);

export default connect(mapStateToProps,{resetAuthError, userLogin})(LoginForm);