import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router';
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

    componentDidMount(){
        //this page has less content so the footer is naturally high up until we manually change that
        let footer = document.getElementsByClassName("footer")[0];
        console.log('foot',footer);
        footer.style.position = "absolute";
        footer.style.bottom = "10px";
        footer.style.left="8px";
        footer.style.right="8px";
        //center the paper on this one component
        let paperBody = document.getElementsByClassName("paperBody")[0];
        paperBody.style.marginTop="3em";
    }

    componentWillUnmount(){
        let footer = document.getElementsByClassName("footer")[0];
        footer.style.position="";
        footer.style.bottom="";
        footer.style.left="";
        footer.style.right="";
        let paperBody = document.getElementsByClassName("paperBody")[0];
        paperBody.style.marginTop="";
    }


    render(){
        const {handleSubmit, error} = this.props;
        return(
            <div>
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<a  className="navTitleBar" href="https://flappcards.com">FlappCards</a>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/home"/>}/>
                    </ToolbarGroup>
                </Toolbar>
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

