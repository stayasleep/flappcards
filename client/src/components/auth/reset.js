import React,{Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ResetForm from './reset_form';
import {Field, reduxForm} from 'redux-form';
import {clearResetPW, isRouteValid} from '../../actions/index';
// import renderInput from '../utilities/renderInputReg';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import {List} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {green500} from 'material-ui/styles/colors';
import {subHeader} from '../utilities/stackSummaryStyle';
import  '../styles/reset.css';


const style={
    header: {
        backgroundColor: "teal",
        color: "white",
        fontFamily: "Roboto, sans-serif"
    },
    resetContainer:{
        margin:'2em',
    },
};

class Reset extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props){
        super(props);
        this.state = {
            token: "",
            time: 3,
        }
    }

    componentWillMount(){
        const {p1,p2,p3}= this.props.location.query; //Pull from the url
        const token = `${p1}.${p2}.${p3}`;//assemble the token
        this.props.isRouteValid(token);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.resetPW){
            this.interval = setInterval(() => this.sendHome(),1000);
        }
    }

    sendHome(){
        if(this.state.time === 0){
            setTimeout(() => {
                browserHistory.push("/");
            },500);
        }else{
            this.setState({time: this.state.time - 1});
        }
    }


    componentWillUnmount(){
        clearInterval(this.interval);
        this.props.clearResetPW();

    }



    render(){
        console.log('reset comp render',this.props);
        //let it spin until axios is complete. then we can determine if link is dead or not; links will work if under expiration date
        if(this.props.isValid===null){
            return (
                <List>
                    <Subheader style={subHeader}>Reset Password</Subheader>
                    <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif"}}>
                        <CircularProgress size={80} thickness={6} />
                    </div>
                </List>
            )
        }
        //link is still good
        if(this.props.isValid) {
            return (
                <div>
                    <Toolbar className="navHeader">
                        <ToolbarTitle text={<Link  className="navTitleBar" href="/">FlappCards</Link>}/>
                        <ToolbarGroup>
                            <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={style.resetContainer}>
                        <ResetForm token={this.props.location.query} passwordReset={this.props.resetPW} count={this.state.time} isError={this.props.resetErr}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <Toolbar className="navHeader">
                        <ToolbarTitle text={<Link  className="navTitleBar" href="/">FlappCards</Link>}/>
                        <ToolbarGroup>
                            <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div className="invalidContainer">
                        <div className="invalidPaper">
                            <h1 className="">Reset Password</h1>
                            <h4>The password reset link has expired.  Please start the password recovery process over again, thank you.</h4>
                            <div className="invalidOptions">
                                <div className="divButton">
                                    <Link to="/login/forgotpassword">Forgot Password?</Link>
                                </div>
                                <div>
                                    <Link to="/">Back To Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
function mapStateToProps(state){
    return{
        isValid: state.reset.isValid,
        resetPW: state.reset.resetPW,
        resetErr: state.reset.resetErr,
    };
}

export default connect(mapStateToProps,{clearResetPW, isRouteValid})(Reset)