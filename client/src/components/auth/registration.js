import React, {Component} from 'react';
import PropTypes from 'prop-types'; // Updated PropTypes import statement
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'
import {register} from '../../actions/index'

class Registration extends Component {

    static contextTypes = {
        router: PropTypes.object
    };
    handleSignup(vals){
        this.props.register(vals);
    }
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
        const regStyle = {
            float: "right",
            textAlign: "center",
            paddingRight: "10%"
        };
        return (
            <div style={regStyle}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit((vals) => {this.handleSignup(vals)})}>
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
                    </div>
                    <div>
                        <Field name="email" component={this.renderInput} label="Email"/>
                    </div>
                    <div>
                        <Field name="birthday" component={this.renderInput} label="Birthday(MM/DD/YYYY)"/>
                    </div>
                    <div>
                        <RaisedButton primary={true} type="submit" label="Submit"/>
                        <RaisedButton backgroundColor="#a4c639" type="button" label="Clear Values" onClick={reset}/>
                    </div>
                </form>
                <Link to="/" name="Log In"><RaisedButton label="Return"/></Link>
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
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (values.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(values.password)) {
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

export default connect(null, {register})(Registration)