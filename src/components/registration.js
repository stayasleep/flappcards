import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'
import asyncReg from './validation/asyncReg';

const validate = values => {
    const errors ={};
    const requiredFields = ['name', 'username', 'password', 'email', 'birthday'];
    requiredFields.forEach(field => {
        if(!values[field]){
            errors[field] = 'required'
        }
    });
    if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address'
    }
    return errors;
};

const renderTextField = props => (
    <TextField hintText={props.label}
               floatingLabelText={props.label}
               errorText={props.touched && props.error}
               {...props}
    />
);

        const MaterialUiForm = props => {
        const { handleSubmit, pristine, reset, submitting } = props;
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field name="name" component={renderTextField} label="First and Last Name"/>
                    </div>
                    <div>
                        <Field name="userName" component={renderTextField} label="Username"/>
                    </div>
                    <div>
                        <Field name="password" component={renderTextField} label="Password"/>
                    </div>
                    <div>
                        <Field name="email" component={renderTextField} label="Email"/>
                    </div>
                    <div>
                        <Field name="birthday" component={renderTextField} label="Birthday"/>
                    </div>
                    <div>
                        <button type="submit" disabled={pristine || submitting}>Submit</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </div>
                </form>
                <Link to="/LogIn" name="Log In"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Return</button></Link>
            </div>
        )
    };

export default reduxForm({
    form: 'MaterialUiForm',
    validate,
    asyncReg
})(MaterialUiForm);