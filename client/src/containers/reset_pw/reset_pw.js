import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {clearResetPW, isRouteValid, submitResetPw} from '../../actions/index';
import LoadingCircle from '../../components/common/index';
import ResetExpired from '../../components/reset_pw/reset_expired';
import ResetForm from './../forms/reset_form';
import  '../../components/styles/reset.css';


class Reset extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props){
        super(props);
        this.state={
            time: 3,
        };
        this.handlePasswordReset = this.handlePasswordReset.bind(this);
    }

    componentWillMount(){
        document.title="FlappCards Reset Password";
    }
    componentWillReceiveProps(nextProps){
        if(this.props.resetPW !== nextProps.resetPW){
            if(nextProps.resetPW){
                this.interval = setInterval(() => this.sendHome(), 1000);
            }
        }
    }
    componentDidMount(){
        //rebuild the reset-token and send to server to determine authenticity
        const { p1, p2, p3 } = this.props.location.query;
        const token = `${p1}.${p2}.${p3}`;
        this.props.isRouteValid(token);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
        this.props.clearResetPW();
    }

    handlePasswordReset(values){
        //build token again, in case the form has been open too long and has now exp
        const { p1, p2, p3 } = this.props.location.query;
        const token = `${p1}.${p2}.${p3}`;

        //that weird redux problem where clearing a form successively can allow blank submissions
        if(Object.keys(values).length !==0) {
            let jCredits = {token: token, values: {...values, resetPw: values.password}};
            this.props.submitResetPw(jCredits);
        }

    }

    sendHome(){
        if(this.state.time === 0){
            setTimeout(()=>{
                browserHistory.push("/");
            }, 444);
        }else{
            this.setState({time: this.state.time -1});
        }
    }

    render(){
        const {resetErr, resetPW, validLink} = this.props;
        return (
            <div className="reset-container">
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<Link  className="navTitleBar" to="/">FlappCards</Link>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                {/*On page load, valid is null*/}
                {typeof validLink === "object" &&
                <LoadingCircle name="FlappCards Reset Password"/>
                }

                {/*On server error, we get a string, DO SOMETHING HERE IN FUTURE*/}
                {validLink === "Network Error" &&
                <div>
                    <h1>FlappCards Reset Password</h1>
                    <h3>Unable to process your request</h3>
                    There is a problem with the network.  Please try again in a few moments.
                </div>
                }

                {/*on expired links*/}
                {typeof validLink === "boolean" && !validLink &&
                <ResetExpired/>
                }

                {/*on valid links we load the form*/}
                {typeof validLink === "boolean" && validLink &&
                <div className="resetForm" style={{fontFamily: "Roboto, sans-serif",background: "rgb(255,255,255)",boxShadow: "5px 5px 2.5px #888888", textAlign:"center", margin:"1em",padding:"1em"}}>
                    <h1 className="header">FlappCards Reset Password</h1>
                    {/*Password success*/}
                    {resetPW &&
                    <h3>Password has successfully been reset!  You will be redirected to the login page where you can use your new
                        password in <span style={{fontWeight:700,fontSize:"1.5em",color:"red"}}>{this.state.time}</span>
                    </h3>
                    }
                    {/*Password Fail or Link becomes stale*/}
                    {resetErr &&
                    <div style={{"color":"red",height:"1em"}}>{resetErr} <Link to="/login/forgotpassword">Reset Password</Link></div>
                    }

                    <ResetForm
                        onPasswordSubmit={this.handlePasswordReset}
                        resetPW={resetPW}
                    />
                </div>
                }

            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        validLink: state.reset.isValid,
        resetPW: state.reset.resetPW,
        resetErr: state.reset.resetErr,
    }
}


export default connect(mapStateToProps,{clearResetPW, isRouteValid, submitResetPw})(Reset);