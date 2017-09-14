import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; // Updated PropTypes import statement
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {register} from '../../actions/index'
import renderInput from '../utilities/renderInputReg';
import GenericDate from '../utilities/generic_date_picker';
import ReactDOM from 'react-dom';

class Registration extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleSignup(vals){
        //redux form issue, when clicking submit without values, you get errors
        //if you clear errors with clear button, you can submit an empty form
        if(Object.keys(vals).length !== 0) {
            vals.name = vals.name.trim();
            vals.userName = vals.userName.trim();
            vals.email = vals.email.trim();
            vals.birthday = `${vals.birthday.getFullYear()}/${vals.birthday.getMonth()+1}/${vals.birthday.getDate()}`;
            this.props.register(vals);
        }
    }


    render (){
        const {handleSubmit, reset} = this.props;
        console.log('ths props',this.props);
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
                        <div style={userError} id="takenUser"/>
                        <Field name="userName" component={renderInput} label="Username"/>
                    </div>
                    <div>
                        <Field name="password" component={renderInput} label="Password" type="password"/>
                        <div style={passWordInfo}>
                            Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.
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
                        <Field id="date"  name="birthday" component={GenericDate} label="Birthday"/>

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
    console.log('func validate',values);
    const min_age = 13;
    const errors = {};
    // const requiredFields = [ 'name', 'userName', 'password', 'passwordConfirm', 'email', 'birthday' ];
    // requiredFields.forEach(field => {
    //     if (!values[ field ]) {
    //         errors[ field ] = 'Required'
    //     }
    // });
    if(!values.name){
        errors.name="Required";
    }
    if(!values.userName){
        errors.userName = "Required";
    }
    if(values.userName && !/^[a-zA-Z0-9]{6,20}/i.test(values.userName)){
        errors.userName = "Username must be 6 to 20 characters long"
    }
    if(values.userName && !/^\w+/i.test(values.userName)){
        errors.userName = "Please only use letters, numbers and _"
    }
    if(!values.email){
        errors.email="Required";
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(!values.password){
        errors.password = "Required";
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

    if(!values.birthday){
        errors.birthday="Required";
    }else if(values.birthday){
        console.log('vals',values.birthday);
        console.log('type',typeof values.birthday);
        let today = new Date();
        let year = values.birthday.getFullYear();
        console.log('years',year);
        let month = values.birthday.getMonth();
        let day = values.birthday.getDate();
        let bday = new Date((year + min_age), month, day);
        if(today.getTime() - bday.getTime() < 0){
            errors.birthday = "Must be 13 years or older to use FlappCards.";
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