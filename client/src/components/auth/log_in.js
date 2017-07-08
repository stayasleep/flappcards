import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import renderInput from '../utilities/renderInput';

const styles = {
    center: {
        textAlign: "center",
        margin: "1em"
    }
};

class LogIn extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleLogin(values) {
        // Action creator userLogin sends an axios call to the server
       this.props.userLogin(values);
    }

    render (){
        const { handleSubmit, error } = this.props;
        return (
            <div className="loginFormOuterDiv">
                <div id="loginForm">
                    {/*Errors will go here*/}
                </div>
                <form onSubmit={handleSubmit((values) => {this.handleLogin(values)})}>
                    <div style={styles.center} className="loginFormFieldsDiv">
                        <div style={styles.center}>
                            <Field className="chromeAuto" name="userName" component={renderInput} label="Username" />
                        </div>
                        <div style={styles.center}>
                            <Field className="chromeAuto" name="password" component={renderInput} label="Password" type="password"/>
                        </div>
                    </div>
                        <RaisedButton primary={true} type="submit" fullWidth={true} className="loginButton" label="Login"/>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    const requiredFields = [ 'userName', 'password'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[field] = `Required`
        }
    });
    
    return errors
}
function mapStateToProps(state) {
    if(state.auth.authError === "Username/Password Incorrect"){

        function appendUserError(el, str) {
            var div = document.createElement('div');
            div.innerHTML = '';
            el.innerHTML = '';
            div.innerHTML = str;
            el.appendChild(div.children[0]);
        }
        var userError = '<div style="color: red; padding: 12px">Username/Password Incorrect</div>';
        appendUserError(document.getElementById("loginForm"), userError); // "body" has two more children - h1 and span.

        state.auth.authError = null; // Reset the authError to null so the user can try registering again.

    }
    return {
        authenticated: state.auth.authenticated,
        error: state.auth.authError
    };
}

LogIn = reduxForm({
    form: 'login',
    validate
})(LogIn);


export default connect(mapStateToProps, {userLogin})(LogIn);
