import React, {Component} from 'react';
import PropTypes from 'prop-types'; // Updated PropTypes import statement
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {register} from '../../actions/index'
import ReactDOM from 'react-dom';
import renderInput from '../utilities/renderInputReg';
import Paper from 'material-ui/Paper';

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
            boxShadow: "5px 5px 2.5px #888888",
            backgroundColor: "rgba(255,255,255,0.9",
            position: "relative",
            padding:"1em",
            height: "100%"
        };
        const passWordInfo = {
            fontSize: 10,
            marginTop: "1.3em"
        };
        const header = {
            margin: 0,
            fontFamily: "Roboto,sans-serif",

        };
        const fieldHeight = {
            height: "4em"
        };
        const userError = {
            height: "1em"
        };
        const buttons = {
            margin: "2em .6em .6em .6em",
        };
        const subBtn = {
            marginRight: "5%",
        };
        const clearBtn={
            boxShadow:"0 0 0 1pt rgb(0,121,107)",
        };

        return (
            <Paper className="paperContainer" style={regStyle}>
                <h1 style={header}>Register</h1>
                <form onSubmit={handleSubmit((vals) => {this.handleSignup(vals)})}>
                    <div style={fieldHeight}>
                        <Field name="name" component={renderInput} label="First and Last Name"/>
                    </div>
                    <div style={fieldHeight}>
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
                    <div style={fieldHeight}>
                        <Field name="email" component={renderInput} label="Email"/>
                    </div>
                    <div style={fieldHeight}>
                        <Field id="date" name="birthday" component={renderInput} label="Birthday(YYYY-MM-DD)"/>
                    </div>
                    <div style={buttons}>
                        <RaisedButton style={subBtn} primary={true} type="submit" label="Submit"/>
                        <RaisedButton style={clearBtn} labelColor="rgb(0, 121, 107)" backgroundColor="#f0f0f0" type="button" label="Clear" onClick={reset}/>
                    </div>
                </form>
            </Paper>
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
    if(state.auth.authError === 'userName'){

        function appendUserError(el, str) {
            var div = document.createElement('div');
            div.innerHTML = '';
            el.innerHTML = '';
            div.innerHTML = str;
            el.appendChild(div.children[0]);
        }
        var userError = '<div style="color: red;">Username is taken</div>';
        appendUserError(document.getElementById("takenUser"), userError); // "body" has two more children - h1 and span.

        state.auth.authError = null; // Reset the authError to null so the user can try registering again.

    }
    return {
        authorized: state.auth.authorized,
        authenticated: state.auth.authenticated,
        error: state.auth.authError
    };
}

Registration = reduxForm({
    form: 'Registration',
    validate
})(Registration);

export default connect(mapStateToProps, {register})(Registration)