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
import Login from './log_in';
import {GridList, GridTile} from 'material-ui/GridList';

class landing extends Component {
    render (){
        const styles = {
            title: {
                cursor: 'pointer',
            },
            root:{
                display:'flex',
                flexWrap:'wrap',
                justifyContent:'space-around'
            },
            gridList: {
                width: 500,
                height: 450,
                overflowY: 'auto',
                padding: 4,
                cols: 2,
            },
            titles:{
                marginBottom: '10vh',
                marginLeft: '20vw',
            },
            midT:{
                color:'red',
            }
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
                <Toolbar style={styles.header}>
                    <ToolbarTitle text="FlappCards" />
                    <ToolbarGroup>
                        <Login/>
                    </ToolbarGroup>
                </Toolbar>
                <div>
                    <h1 style={styles.titles}>FL<span style={styles.midT}>APP</span>CARDS</h1>
                    <h3>The #1 Flashcard-App Around!</h3><br/>

                    <h5>Create personalized study stacks or search new topics at the click of a button.</h5><br/>

                    <h5>Our mission is to make learning easier for everybody.</h5><br/>
                    <h5>Improve your grades by studying with FlappCards.  It's easy to use, fun, and always free!</h5><br/>

                    <h6>Find more of what you're looking for on FlappCards,</h6><br/>
                    <h6>Join Today!</h6>
                    <Registration/>
                </div>
            </div>
        )
    }
}


export default landing
