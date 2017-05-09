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
                        Create Cards to Study! Study Cards Made By Our Flappy Community!
                    <Registration/>
                </div>
            </div>
        )
    }
}


export default landing
