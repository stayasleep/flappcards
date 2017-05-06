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
                        <Field name="birthday" component={this.renderInput} label="Birthday(YYYYMMDD)"/>
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
    var min_age = 13;
    const errors = {};
    const requiredFields = [ 'name', 'userName', 'password', 'passwordConfirm', 'email', 'birthday' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    if(values.userName && !/^[a-zA-Z0-9]{6,20}/i.test(values.userName)){
        errors.userName = "Username must be 6 to 20 characters long"
    }
    if(values.userName && !/^\w+/i.test(values.userName)){
        errors.userName = "Please only use letters, numbers and _"
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (values.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(values.password)) {
        errors.password = 'Must be between 8 and 15 characters long'
    }
    if(values.password && !/^(?=.*[a-z])/i.test(values.password)){
        errors.password = 'Must have lowercase letter'
    }
    if(values.password && !/^(?=.*[A-Z])/i.test(values.password)){
        errors.password = 'Must have uppercase letter'
    }
    if(values.password && !/^(?=.*[0-9])/i.test(values.password)){
        errors.password = 'Must have number'
    }
    if(values.password && !/^(?=.*[!@#\$%\^&\*])/i.test(values.password)){
        errors.password = 'Must have special character(!,@,#,$,%,\,^,&)'
    }
    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match'
    }
    if (values.birthday && !/([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/i.test(values.birthday)){
        errors.birthday = 'Enter a Correct Date (YYYY/MM/DD)'
    }
    if(values.birthday) {
        var year = parseInt(values.birthday.slice(0, 4));
        var month = parseInt(values.birthday.slice(4, 6));
        var day = parseInt(values.birthday.slice(6, 8));
    if(month < 10){
        month = parseInt("0" + month)
    }
        if(day < 10){
            day = parseInt("0" + day)
        }
        var theirDate = new Date((year + min_age), month, day);
        var today = new Date;
        if ((today.getTime() - theirDate.getTime()) < 0) {
            errors.birthday = 'You must be over 13 to use'
        }
    }
    return errors
}

Registration = reduxForm({
    form: 'Registration',
    validate
})(Registration);

export default connect(null, {register})(Registration)