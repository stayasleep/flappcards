import React, { Component } from 'react';
import {Link} from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import RegisterForm from '../forms/register_form';


//a logged in user who visits this route will override the token with the newly created account
class Register extends Component {

    componentWillMount(){
        document.title="FlappCards - Sign Up Today!";
    }

    componentWillUnmount(){
        document.title="FlappCards";
    }


    render(){
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
                    <RegisterForm/>
                    </div>
                </Paper>

            </div>
        )
    }
}

export default Register;