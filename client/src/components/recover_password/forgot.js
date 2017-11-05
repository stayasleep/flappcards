import React,{Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ForgotPW from '../auth/forgot_pw';
import {resetAuthRecovery} from '../../actions/index';


class Forgot extends Component{
    constructor(props){
        super(props);
        this.state={
            time: 3,
            fullBar: false,
            windowWidth: window.innerWidth,
        };
    }
    static contextTypes={
        router:PropTypes.object
    };

    componentWillMount(){
        document.title="FlappCards - Reset Password";
    }
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
        //if the window is too small, we will now make dialog buttons full screen for convenience
        //maybe this should be an event listener so it can be dynamic
        if(this.state.windowWidth < 480){
            this.setState({fullBar: !this.state.fullBar});
        }
    }
    componentWillReceiveProps(nextProps){
        console.log('component receiving props',nextProps);
        if(nextProps.recoverPW){
            this.interval = setInterval(() => this.sendMeHome(),1000);
        }
    }

    sendMeHome(){
        if(this.state.time === 0){
            setTimeout(() => {
                browserHistory.push("/");
            },500);
        }else{
            this.setState({time: this.state.time - 1});
        }
    }

    //this sets the footer back to norm so it isnt weird on the next page that renders
    componentWillUnmount(){
        clearInterval(this.interval);
        //this.props.resetAuthRecovery();
        let footer = document.getElementsByClassName("footer")[0];
        footer.style.position="";
        footer.style.bottom="";
        footer.style.left="";
        footer.style.right="";
        let paperBody = document.getElementsByClassName("paperBody")[0];
        paperBody.style.marginTop="";
        document.title="FlappCards";
    }

    render(){
        console.log('render render render',this.props);
        let disableSubmit = false;
        if (this.props.recoverPW) disableSubmit = true; // prevent user from submitting form twice before redirect
        return(
            <div>
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<Link  className="navTitleBar" to="/">FlappCards</Link>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Paper className="paperBody loginComponentOnly" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">Reset Password</h1>
                        {this.props.recoverPW ?
                            (
                                <div>
                                    <p>
                                        An email has been sent!  You will be redirected to the home page in <span className="timer" style={{fontWeight:700, fontSize:"1.5em",color:"red"}}>{this.state.time}</span> seconds...
                                    </p>
                                </div>
                            ) : null
                        }
                        <ForgotPW fullBar={this.state.fullBar} disabled={disableSubmit}/>
                    </div>
                </Paper>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        recoverPW: state.auth.recoverPW,
    }
}

export default connect(mapStateToProps,{resetAuthRecovery})(Forgot);
