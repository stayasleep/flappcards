import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import renderInput from '../utilities/renderInput';
import {userLogin} from '../../actions/index';
import RecoverPw from '../confirmActionModal/recoverPW';



class SignIn extends Component{
    static contextTypes={
        router:PropTypes.object
    };

    handleLogIn(values){
        //Action creator userLogin sends an axios call to the server
        this.props.userLogin(values);
    }


    render(){
        const {handleSubmit, error} = this.props;
        return(
            <div>
                <Paper className="paperBody" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">Log In</h1>
                        <div id="loginForm">
                            {/*Errors go here*/}
                        </div>
                        <form onSubmit = {handleSubmit((values)=>{this.handleLogIn(values)})}>
                            <div className="fieldContainer">
                                <Field name="userName" component={renderInput} label="Username"/>
                                <Field name="password" component={renderInput} label="Password" type="password"/>
                            </div>
                            <div className="logResetContainer">
                                <RaisedButton primary={true} type="submit" label="Login" />
                                <RecoverPw/>
                            </div>
                        </form>
                    </div>

                </Paper>
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    const requiredFields = ['userName','password'];
    requiredFields.forEach(field=>{
        if (!values[field]){
            errors[field] = `Required`
        }
    });
    return errors;
}

function mapStateToProps(state){
    if(state.auth.authError==="Username/Password Incorrect"){

        function appendUserError(el,str){
            var div = document.createElement('div');
            div.innerHTML="";
            el.innerHTML = "";
            div.innerHTML = str;
            el.appendChild(div.children[0])
        }
        var userError = '<div style="color: red; padding: 12px">Username/Password Incorrect</div>';
        appendUserError(document.getElementById("loginForm"), userError); // "body" has two more children - h1 and span.

        state.auth.authError = null; // Reset the authError to null so the user can try registering again.
    }
    return {
        authenticated: state.auth.authenticated,
        error: state.auth.authError
    };
}

SignIn = reduxForm({
    form:'login',
    validate
})(SignIn);
export default connect(mapStateToProps,{userLogin})(SignIn);

