import React, { Component } from 'react';
import { change ,Field, reduxForm, Fields } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import GenericDate from '../../components/utilities/generic_date_picker';
// import renderInput from '../../components/utilities/renderInputStackOV'; //using this, on field reset...the error sets off. has to do with the conditional inside func
import renderInput from '../../components/utilities/renderInputReg';
import {register, resetAuthError} from '../../actions/index';

class RegisterForm extends Component {

    componentWillReceiveProps(nextProps){
        // this.props.form['registration']['userName'].onChange('newValue'); how to achieve this?
        //if error occurs during reg, reset password fields to null
        if(this.props.authError !== nextProps.authError) {
            this.props.dispatch(change('registration','password', null));
            this.props.dispatch(change('registration','passwordConfirm', null));
        }

    }
    componentWillUnmount(){
        //reset any errors registration may have incurred when leaving this component
        if(this.props.authError){
            this.props.resetAuthError();
        }
    }

    handleRegistration(values){
        if(Object.keys(values).length !== 0){
            let j={
                ...values,
                name: values.name.trim(),
                userName: values.userName.trim(),
                email: values.email.trim(),
            };
            if(typeof values.birthday === "object"){
                //successive birthday changes are already string, and server expects string so we convert all initial submissions
                j.birthday = `${values.birthday.getFullYear()}/${values.birthday.getMonth() + 1}/${values.birthday.getDate()}`;
            }
            this.props.register(j);
        }
    }



    render(){
        console.log('register form props',this.props);
        const {handleSubmit, pristine, submitting, reset} = this.props;

        return(
            <div className="register-form">
                <h1 className="titleUnderline">Join FlappCards Today!</h1>
                {this.props.authError && this.props.authError === "userName" &&
                <div className="authError" style={{color:"red",fontWeight:"700"}}>Username is taken!</div>
                }
                <form onSubmit={handleSubmit((values) => this.handleRegistration(values))}>
                    <div className="fieldContainer">
                        <Field name="name" component={renderInput} label="First and Last Name"/>

                        <Field name="userName" component={renderInput} label="Username"/>
                        <Field name="password" component={renderInput} label="Password" type="password"/>
                        <div style={{fontSize: 10, marginTop:"1.1em"}}>
                            Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.
                        </div>
                        <Field name="passwordConfirm" component={renderInput} label="Confirm Password" type="password"/>
                        <Field name="email" component={renderInput} label="Email"/>
                        <Field id="date"  name="birthday" component={GenericDate} label="Birthday"/>
                    </div>
                    <div className="logResetContainer" style={{margin:"2em auto", width:"50%"}}>
                        <RaisedButton style={{margin:"1em 0"}} primary={true} type="submit" label="Submit" disabled={submitting} fullWidth={true} />
                        <RaisedButton style={{boxShadow:"0 0 0 1pt rgb(0,121,107)"}} labelColor="rgb(0, 121, 107)" backgroundColor="#f0f0f0" type="button" label="Clear" onClick={reset} disabled={pristine || submitting} fullWidth={true} />
                    </div>
                </form>
            </div>
        )
    }
}

function validate(values){
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
    }else if(values.name && /^\s+$/.test(values.name)){
        errors.name="Name must contain a value";
    }else if(values.name.length > 40){
        errors.name="Name must contain fewer than 40 characters";
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
    } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(values.email)) {
        errors.email = 'Please enter a valid email'
    }else if(values.email.length > 30){
        errors.email = "Email must be shorter than 30 characters";
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
        errors.passwordConfirm = 'Passwords must match!'
    }

    if(!values.birthday){
        errors.birthday="Required";
    }else if(values.birthday && typeof values.birthday === "object"){
        //only need to verify bday when it is an object, when it is a string and the user
        //changes to a new birthday, it is rendered again as an obj. so string never occurs except during invalid form submission
        let today = new Date();
        let year = values.birthday.getFullYear();
        let month = values.birthday.getMonth();
        let day = values.birthday.getDate();
        let bday = new Date((year + min_age), month, day);
        if(today.getTime() - bday.getTime() < 0){
            errors.birthday = "Must be 13 years or older to use FlappCards.";
        }
    }
    return errors;

}

function mapStateToProps(state){
    return {
        authError: state.auth.authError,
    }
}


RegisterForm=reduxForm({
    form:'registration',
    validate,
})(RegisterForm);

export default connect (mapStateToProps,{register, resetAuthError})(RegisterForm);