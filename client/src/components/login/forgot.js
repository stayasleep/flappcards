import React,{Component} from 'react';
import ForgotPW from '../auth/forgot_pw';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import {Link} from 'react-router';



class Forgot extends Component{
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
    }
    //this sets the footer back to norm so it isnt weird on the next page that renders
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
        return(
            <div>
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<a  className="navTitleBar" href="https://flappcards.com">FlappCards</a>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/home"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Paper className="paperBody loginComponentOnly" zDepth={2}>
                    <div className="innerPaper">
                        <h1 className="titleUnderline">Reset Password</h1>
                        <ForgotPW/>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default Forgot;