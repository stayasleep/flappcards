import React, {Component} from 'react';
import {Field, reduxForm } from 'redux-form'; // input fields through redux
import {Link} from 'react-router'; // to be able to move from component to component
import {connect} from 'react-redux';
import {userLogin} from '../actions/index'

import TextField from 'material-ui/TextField'; // Material Design themed input fields
import RaisedButton from 'material-ui/RaisedButton';

const LoginButton = () => {
    return (
        <RaisedButton label="Login" primary={true} style={style} />
    )
};

const RegisterButton = () => {
    return (
        <RaisedButton label="Register" secondary={true} style={style} />
    )
};


const validate = (values) => {
    const errors = {}; // errors object; key values will be the field where the error occurred
    const requiredFields = ['username', 'password'];
    // requiredFields.forEach() instead of requiredFields.map() because why return a new array?
    // TODO add regex input validation to fields consistent with valid username and password criteria (TBD)
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = `${field} is required`; // Log the errors in the errors object
        }
    });
    return errors;
};

const renderTextField = (props) => {
    return (<TextField hintText={props.label} floatingLabelText={props.label} errorText={props.touched && props.error}{...props}/>);
};

let LogIn = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name = "username" type="text" component={renderTextField} label="username" />
            </div>

            <div>
                <Field name = "username" type="text" component={renderTextField} label="password" />
            </div>

            <div>
                {/*<Link to="/Home"><RaisedButton type="submit" disabled={pristine || submitting}>Login</RaisedButton></Link>*/}
                <RaisedButton type="submit"  disabled={pristine || submitting}>Login</RaisedButton>
                <Link to="/Registration"><RaisedButton type ="button"  disabled={pristine || submitting} onClick={reset}>Register</RaisedButton></Link>
            </div>
        </form>
    )
};

LogIn = reduxForm({
    form: 'login',
    validate
})(LogIn);

export default connect(null, {userLogin})(LogIn);
