import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router';
import renderInput from '../utilities/renderInput';
import { resetAuthError, userLogin} from '../../actions/index';
import RecoverPw from '../confirmActionModal/recoverPW';



class SignIn extends Component{
    static contextTypes={
        router:PropTypes.object
    };
    constructor(props){
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            fullBar: false,
        };
    }

    componentWillMount(){
        //if you logged on, closed tab, come back you already have a token so skip this page
        //for persistent login
        if(this.props.authorized){
            this.context.router.push('/home');
        }
        document.title="FlappCards - Sign In";
    }
    //Inquire as to whether or not componentWillUpdate(nextProps) is needed here

    componentDidMount(){
        //this page has less content so the footer is naturally high up until we manually change that
        let footer = document.getElementsByClassName("footer")[0];
        footer.style.position = "absolute";
        footer.style.bottom = "10px";
        footer.style.left="8px";
        footer.style.right="8px";
        //center the paper on this one component
        let paperBody = document.getElementsByClassName("paperBody")[0];
        paperBody.style.marginTop="3em";

        if(this.state.windowWidth < 480){
            this.setState({fullBar: !this.state.fullBar});
        }
    }

    handleLogIn(values){
        this.props.userLogin(values);
    }

    componentWillUnmount(){
        this.props.resetAuthError();
        let footer = document.getElementsByClassName("footer")[0];
        footer.style.position="";
        footer.style.bottom="";
        footer.style.left="";
        footer.style.right="";
        let paperBody = document.getElementsByClassName("paperBody")[0];
        paperBody.style.marginTop="";
        //necessary?
        document.title="FlappCards";
    }


    render(){
        const {handleSubmit, error} = this.props;
        return(
            <div>
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<Link className="navTitleBar" to="/">FlappCards</Link>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Paper className="paperBody loginComponentOnly" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">Log in to FlappCards</h1>
                        <div id="loginForm">
                            { this.props.errLogInComp ?
                                (
                                    <div style={{"color": "red"}}>{this.props.errLogInComp}</div>
                                ) : null
                            }
                        </div>
                        <form onSubmit = {handleSubmit((values)=>{this.handleLogIn(values)})}>
                            <div className="fieldContainer">
                                <Field name="userName" component={renderInput} label="Username"/>
                                <Field name="password" component={renderInput} label="Password" type="password"/>
                            </div>
                            <div className="logResetContainer">
                                <RaisedButton primary={true} type="submit" label="Login" fullWidth={this.state.fullBar} />
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

    return {
        authorized: state.auth.authorized,
        authenticated: state.auth.authenticated,
        errLogInComp: state.auth.authError
    };
}

SignIn = reduxForm({
    form:'login',
    validate
})(SignIn);
export default connect(mapStateToProps,{resetAuthError, userLogin})(SignIn);

