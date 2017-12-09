import React, { Component } from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ForgotForm from '../forms/forgot_form';


class Forgot extends Component {
    static contextTypes={
        router:PropTypes.object
    };
    componentWillMount(){
        document.title="FlappCards - Recover Password";
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
    }
    componentWillUnmount(){
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
        return(
            <div className="forgot-container">
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<Link  className="navTitleBar" to="/">FlappCards</Link>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Paper  className="paperBody loginComponentOnly" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">Recover Password</h1>
                        <ForgotForm dialog={false}/>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default Forgot;