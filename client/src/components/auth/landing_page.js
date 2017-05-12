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
import LoginModal from '../confirmActionModal/loginModal'
import {GridList, GridTile} from 'material-ui/GridList';
import home from '../imgs/home2.JPG'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionCardMembership from 'material-ui/svg-icons/action/card-membership'
import Paper from 'material-ui/Paper';


const styles = {
    title: {
        cursor: 'pointer',
    },
    // div:{
    //     display:'flex',
    //     flexDirection:'row wrap',
    //     // padding:20,
    //     height:'100vh',
    //     backgroundImage:`url(${home})`,
    //     width: '100%',
    //     position: "relative",
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize:'cover',
    //     // height: '89vh',
    //     backgroundAttachment:'fixed',
    // },
    paperLeft: {
        flex: 1,
        // height: '100%',
        margin: 10,
        textAlign: 'center',
        // padding: 10,
    },
    paperRight:{
        // height:600,
        flex: 4,
        margin: 10,
        textAlign: 'center',
        backgroundColor: "rgba(255,255,255, 0.7)",
    },
    loginStyle:{
        position: "relative",
        width: "70%",
        height: "100%"
    },
    inputStyle:{
        height: "50%"
    },
    mesgStyle:{
        textAlign: "center",
        fontSize: "4vh"
    },
    subs:{
        margin:"5%",
        color: 'black',
        fontWeight: 900,
        fontSize: "1.5em",
        fontFamily:"Roboto,sans-serif",
        // opacity:0.7
    },
    // midT:{
    //     color: 'red',
    // },
    // mTitle:{
    //     marginBottom:'5%',
    // },
    login: {
        width: 500,
        margin: 0
    },
    // mainDiv:{
    //     width:'100vw',
    //     textAlign: 'center',
    //     display:'block',
    //     margin:'auto',
    //     display:'flex',
    //     flexDirection:'row wrap',
    //     // padding:20,
    //     height:'100vh',
    //     backgroundImage:`url(${home})`,
    //     width: '100%',
    //     position: "relative",
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize:'cover',
    //     // height: '89vh',
    //     backgroundAttachment:'fixed',
    // },
    div2:{
        width:'100%',
        textAlign: 'center',
        display:'block',
        margin:'auto',
    },
    container2:{
        display:'flex',
        flexDirection:'row wrap',
        // width:'100vw',
        backgroundImage:`url(${home})`,
        position: "relative",
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        height: '89vh',
        backgroundAttachment:'fixed',
    }
};

class landing extends Component {
    render (){
        return (
            <div>
                <AppBar style={styles.header} title={<span style={styles.title}>FlappCards</span>} showMenuIconButton={false} iconElementRight={<LoginModal/>}/>
                <Paper style={styles.div2} zDepth={1}>
                    <div id="mobileIntro" style={styles.paperRight}>
                        {/*<h1 style={styles.mTitle}>FL<span style={styles.midT}>APP</span>CARDS</h1>*/}
                        <h3 style={styles.subs}>The #1 Flashcard-App Around!</h3>
                        <h3 style={styles.subs}>Find more of what you're looking for on FlappCards,</h3>
                        <h3 style={styles.subs}>Join Today!</h3>
                    </div>
                    <div style={styles.container2}>
                        <div id="Intro" style={styles.paperRight}>
                            {/*<h1 style={styles.mTitle}>FL<span style={styles.midT}>APP</span>CARDS</h1>*/}
                            <h3 style={styles.subs}>The #1 Flashcard-App Around!</h3>
                            <h3 style={styles.subs}>Create personalized study stacks or search new topics at the click of a button.</h3>
                            <h3 style={styles.subs}>Our mission is to make learning easier for everybody.</h3>
                            <h3 style={styles.subs}>Improve your grades by studying with FlappCards.  It's easy to use, fun, and always free!</h3>
                            <h3 style={styles.subs}>Find more of what you're looking for on FlappCards,</h3>
                            <h3 style={styles.subs}>Join Today!</h3>
                        </div>
                        <div style={styles.paperLeft}>
                            <Registration/>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}


export default landing
