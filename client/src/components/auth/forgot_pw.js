import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {recoverPw} from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import renderInput from '../utilities/renderInput';

const styles = {
    center: {
        textAlign:"center",
        margin:"1em"
    }
};

class ForgotPw extends Component{
    static contextTypes = {
        router: PropTypes.object
    } ;
    handleLogin(values){
        //Action creator recoverPW sends an axios call to the server
        this.props.userInfo(values);
    }

    render (){
        const {handleSubmit, error} = this.props;
        return (
            <div>
                <div id="recoverForm">
                    {/*Errors Will go here*/}
                </div>
                <form onSubmit={handleSubmit((values)=>{this.handleLogin(values)})}>
                    <div style={styles.center}>
                        <div style={styles.center}>
                        <Field name="userName" component={renderInput} label="Username"/>
                        </div>
                        <div style={styles.center}>
                            <Field name="userEmail" component={renderInput} label="Email" type="email"/>
                        </div>
                        <RaisedButton primary={true} type="submit" label="Login"/>
                    </div>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    const requiredFields = ['userName','userEmail'];
    requiredFields.forEach(field => {
        if(!values[field]) {
            errors[field] = `Required`
        }
    });

    return errors
}

function mapStateToProps(state){
    if(state.auth.authError === "Username/Email combination not found!"){
        function appendUserError(el, str){
            var div = document.createElement('div');
            div.innerHTML = '';
            el.innerHTML= '';
            div.innerHTML = str;
            el.appendChild(div.children[0]);
        }
        var recoverError='<div style="color: red; padding: 12px">Username/Email combination not found!</div>';
        appendUserError(document.getElementById("recoverForm"), recoverError);//"body" has 2 more children - h1 and span

        state.auth.authError = null;//reset the authError to null so the user can try recovery again

    }
    return{
        authenticated: state.auth.authenticated,
        error: state.auth.authError
    };
}

ForgotPw = reduxForm({
    form:'login',
    validate
})(ForgotPw);

export default connect(mapStateToProps,{recoverPw})(ForgotPw);