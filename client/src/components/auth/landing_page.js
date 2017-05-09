import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router'
import Registration from './registration';
import Login from './log_in'

class landing extends Component {
    render (){
        const styles = {
            title: {
                cursor: 'pointer',
            },
        };
        const loginStyle = {
            position: "relative",
            width: "70%",
            height: "100%"
        };
        const inputStyle = {
            height: "50%"
        };
        const mesgStyle = {
            textAlign: "center",
            fontSize: "4vh"
        };
        return (
            <div>
                <Toolbar>
                    <ToolbarTitle text="FlappCards" />
                    <ToolbarGroup>
                        <Login/>
                    </ToolbarGroup>
                </Toolbar>
                <div>
                        FLAPPCARDS<br/>
                        The #1 Flashcard-App Around!<br/>

                        Create personalized study stacks or search new topics at the click of a button.<br/>

                    Our mission is to make learning easier for everybody.<br/>
                    Improve your grades by studying with FlappCards.  It's easy to use, fun, and always free!<br/>

                    Find more of what you're looking for on FlappCards,<br/>
                        Join Today!
                    <Registration/>
                </div>
            </div>
        )
    }
}


export default landing
