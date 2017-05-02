import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'

class Registration extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    renderInput({input, label, type, meta: {touched, error}}){
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       type={type}
                       {...input}
            />
        )
    }

    render (){
        const {handleSubmit, reset} = this.props;
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field name="name" component={this.renderInput} label="First and Last Name"/>
                    </div>
                    <div>
                        <Field name="userName" component={this.renderInput} label="Username"/>
                    </div>
                    <div>
                        <Field name="password" component={this.renderInput} label="Password" type="password"/>
                    </div>
                    <div>
                        <Field name="passwordConfirm" component={this.renderInput} label="Confirm Password" type="password"/>
                    </div>
                    <div>
                        At least 1 lowercase letter, 1 uppercase letter, 1 #, and 1 special character and be between 8 and 15 characters long
                    </div>
                    <div>
                        <Field name="email" component={this.renderInput} label="Email"/>
                    </div>
                    <div>
                        <Field name="birthday" component={this.renderInput} label="Birthday(MM/DD/YYYY)"/>
                    </div>
                    <div>
                        <RaisedButton label="Submit"/>
                        <RaisedButton type="button" onClick={reset}>Clear Values</RaisedButton>
                    </div>
                </form>
                <Link to="/" name="Log In"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Return</button></Link>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    const requiredFields = [ 'name', 'userName', 'password', 'passwordConfirm', 'email', 'birthday' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (values.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})$/i.test(values.password)) {
        errors.password = 'Invalid password'
    }
    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match'
    }
    return errors
}

Registration = reduxForm({
    form: 'Registration',
    validate
})(Registration);

export default connect(null, {})(Registration)