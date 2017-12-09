import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LoginForm from '../forms/login_form';
import RecoverPW from '../../components/confirmActionModal/recoverPW';

//signReg.css
class Login extends Component {
    static contextTypes={
        router:PropTypes.object
    };
    constructor(props){
        super(props);
        this.state={
            windowWidth: window.innerWidth,
        };
    }

    componentDidMount(){
        //if logged in from prev visit, push them home
        document.title="FlappCards - Sign In";
        let footer = document.getElementsByClassName("footer")[0];
        footer.style.position = "absolute";
        footer.style.bottom = "10px";
        footer.style.left="8px";
        footer.style.right="8px";
        //center the paper on this one component
        let paperBody = document.getElementsByClassName("paperBody")[0];
        paperBody.style.marginTop="3em";

        if(this.props.authorized){
            this.context.router.push('/home');
        }
    }

    componentWillUnmount(){
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
        const {windowWidth} = this.state;

        return(
            <div className="login-container">
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<Link className="navTitleBar" to="/">FlappCards</Link>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Paper  className="paperBody loginComponentOnly" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">Log in to FlappCards</h1>

                        <LoginForm>
                            {/*Large Screens served Dialog, small screens we send to dedicated route*/}
                            {windowWidth > 480 ?
                                <RecoverPW/>
                                :
                                <Link className="forgotLink" to="/login/forgotpassword" style={{color:"teal"}}>Forgot Password?</Link>
                            }
                        </LoginForm>
                    </div>
                </Paper>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        authorized: state.auth.authorized,
    }
}


export default connect(mapStateToProps,{})(Login);