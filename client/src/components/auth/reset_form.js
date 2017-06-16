import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {submitResetPw} from '../../actions/index';
import ReactDom from 'react-dom';
import renderInputReg from '../utilities/renderInputReg';
import Paper from 'material-ui/Paper';

class ResetForm extends Component {

    static contectTypes = {
        router: PropTypes.object
    };
    handleReset(vals){
        const {p1,p2,p3}= this.props.token; //Pull from the url
        const token = `${p1}.${p2}.${p3}`;
        let data = {token: token, vals: vals};
        this.props.submitResetPw(data);
    }


    render(){
        const {handleSubmit, reset} = this.props;
        const regStyle = {
            float: "right",
            textAlign: "center",
            color: 'black',
            boxShadow: "5px 5px 2.5px #888888",
            backgroundColor: "rgba(255,255,255,0.9",
            position: "relative",
            padding:"0 1em"
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
        }

        return (
            <Paper style={regStyle}>
                <h1 style={header}>Reset Password</h1>
                <h3 style={header}>Enter a new password for your account</h3>
                <form onSubmit={handleSubmit((vals)=>{this.handleReset(vals)})}>
                    <div>
                        <Field name="resetPw" component={renderInputReg} label="New Password" type="password"/>
                        <div style={passWordInfo}>
                            Passwords must be at least 6 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.
                        </div>
                    </div>
                    <div>
                        <Field name="passwordConfirm" component={renderInputReg} label="Confirm New Password" type="password"/>
                    </div>
                    <div style={userError} id="resetFail">
                    </div>
                    <div style={buttons}>
                        <RaisedButton style={subBtn} primary={true} type="submit" label="Submit"/>
                        <RaisedButton style={clearBtn} backgroundColor="#f0f0f0" type="button" label="Clear" onClick={reset}/>
                    </div>
                </form>
            </Paper>
        )
    }
}

function validate(values){
    const errors={};
    const requiredFields =['resetPw','passwordConfirm'];
    requiredFields.forEach(field =>{
        if(!values[field]){
            errors[field] = 'Required'
        }
    });
    if (values.resetPw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(values.resetPw)) {
        errors.resetPw = 'Must be between 8 and 15 characters long'
    }
    if(values.resetPw && !/^(?=.*[a-z])/i.test(values.resetPw)){
        errors.resetPw = 'Must have lowercase letter'
    }
    if(values.resetPw && !/^(?=.*[A-Z])/i.test(values.resetPw)){
        errors.resetPw = 'Must have uppercase letter'
    }
    if(values.resetPw && !/^(?=.*[0-9])/i.test(values.resetPw)){
        errors.password = 'Must have number'
    }
    if(values.resetPw && !/^(?=.*[!@#\$%\^&\*])/i.test(values.resetPw)){
        errors.resetPw = 'Must have special character(!,@,#,$,%,\,^,&)'
    }
    if (values.resetPw !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match'
    }
    return errors

}
function mapStateToProps(state){
    if(state.auth.authError === "This link has already expired.  Please try the password reset process again."){

        function appendUserError(el,str){
            var div = document.createElement('div');
            div.innerHTML='';
            el.innerHTML = '';
            div.innerHTML = str;
            el.appendChild(div.children[0]);
        }
        var userError = '<div style="color: red;">There was an error handling your request.  Please restart the reset password process</div>'; //this should be error from axios call bc token/databse arent the same or time expired
        appendUserError(document.getElementById("resetFail"),userError);

        state.auth.authError = null; //Reset the authError to null so the user can try resetting again?? Prob need to fix this .

    }
    return{
        authenticated: state.auth.authenticated,
        error: state.auth.authError
    };
}

ResetForm = reduxForm({
    form: 'ResetForm',
    validate
})(ResetForm);

export default connect(mapStateToProps, {submitResetPw})(ResetForm)