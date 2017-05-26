import React, {Component} from 'react';
import PropTypes from 'prop-types'; // Updated PropTypes import statement
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'
import {register} from '../../actions/index'
import ReactDOM from 'react-dom';
import renderInput from '../utilities/renderInputReg';

class Registration extends Component {

    static contextTypes = {
        router: PropTypes.object
    };
    handleSignup(vals){
        this.props.register(vals);
    }

    componentDidUpdate(event){
        var dateField = ReactDOM.findDOMNode(this);
        if(dateField.children[1].children[6].children["0"].children.birthday) {
            dateField.children[1].children[6].children["0"].children.birthday.onkeyup = bar;
            function bar(evt) {
                var v = this.value;
                if (v.match(/^\d{4}$/) !== null) {
                    this.value = v + '-';
                } else if (v.match(/^\d{4}\-\d{2}$/) !== null) {
                    this.value = v + '-';
                }

            }
        }
    }

    render (){
        const {handleSubmit, reset} = this.props;
        const regStyle = {
            float: "right",
            textAlign: "center",
            color: 'black',
            backgroundColor: "rgba(255,255,255,1",
            position: "relative"
        };
        const passWordInfo = {
            fontSize: 10,
            marginTop: "1.3em"
        };
        const header = {
            margin: 0,
            fontFamily: "Roboto,sans-serif",

        };
        const userError = {
            height: "1em"
        }
        const buttons = {
            margin: "1.3em",
        };

        return (
            <div style={regStyle}>
                <h1 style={header}>Register</h1>
                <form onSubmit={handleSubmit((vals) => {this.handleSignup(vals)})}>
                    <div>
                        <Field name="name" component={renderInput} label="First and Last Name"/>
                    </div>
                    <div>
                        <Field name="userName" component={renderInput} label="Username"/>
                        <div style={userError} id="takenUser"/>
                    </div>
                    <div>
                        <Field name="password" component={renderInput} label="Password" type="password"/>
                        <div style={passWordInfo}>
                            Passwords must be at least 6 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.
                        </div>
                    </div>
                    <div>
                        <Field name="passwordConfirm" component={renderInput} label="Confirm Password" type="password"/>
                    </div>
                    <div>
                    </div>
                    <div>
                        <Field name="email" component={renderInput} label="Email"/>
                    </div>
                    <div>
                        <Field id="date" name="birthday" component={renderInput} label="Birthday(YYYY-MM-DD)"/>
                    </div>
                    <div style={buttons}>
                        <RaisedButton primary={true} type="submit" label="Submit"/>
                        <RaisedButton backgroundColor="#a4c639" type="button" label="Clear Values" onClick={reset}/>
                    </div>
                </form>
            </div>
        )
    }
}

function validate(values) {
    var min_age = 13;
    const errors = {};
    var birth = '';
    if(values.birthday) {
        birth = values.birthday.replace(/[^0-9 ]/g, '');

    }
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
    if (values.birthday && !/([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/i.test(birth)){
        errors.birthday = 'Enter a Correct Date (YYYY-MM-DD)'
    }
    if(values.birthday) {
        var year = parseInt(birth.slice(0, 4));
        var month = parseInt(birth.slice(4, 6));
        var day = parseInt(birth.slice(6, 8));
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

function mapStateToProps(state) {
    if(state.auth.authError !== null){
        function appendHtml(el, str) {
            var div = document.createElement('div');
            div.innerHTML = str;
            el.appendChild(div.children[0]);
        }
        var html = '<div style="float: left; color: red; width=100px; height: 30px">Username is taken</div>';
        appendHtml(document.getElementById("takenUser"), html); // "body" has two more children - h1 and span.
    }
    return {
        authenticated: state.auth.authenticated,
        error: state.auth.authError
    };
}

Registration = reduxForm({
    form: 'Registration',
    validate
})(Registration);

export default connect(mapStateToProps, {register})(Registration)