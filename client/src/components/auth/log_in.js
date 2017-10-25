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
                    {this.props.authError ? (
                        <div style={{"color":"red"}}>{this.props.authError}</div>
                    ) :
                        null
                    }
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
                        <RaisedButton style={{margin:"1em"}} primary={true} type="submit" fullWidth={false} className="loginButton" label="Login"/>
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
    return {
        authorized: state.auth.authorized,
        authenticated: state.auth.authenticated,
        authError: state.auth.authError
    };
}

LogIn = reduxForm({
    form: 'login',
    validate
})(LogIn);


export default connect(mapStateToProps, {userLogin})(LogIn);
