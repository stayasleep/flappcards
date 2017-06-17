import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Registration from './registration';
import LoginModal from '../confirmActionModal/loginModal'
import RecoverPw from '../confirmActionModal/recoverPW'
import {GridList, GridTile} from 'material-ui/GridList';
import home from '../imgs/home2.JPG'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';


const styles = {
    title: {
        cursor: 'pointer',
    },
    paperLeft: {
        flex: 1,
        margin: 10,
        textAlign: 'center',
    },
    paperRight:{
        flex: 4,
        margin: 10,
        textAlign: 'center',
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
        textShadow:"2px 0 2px rgba(255,255,255,0.7)"
        // opacity:0.7
    },
    login: {
        width: 500,
        margin: 0
    },
    div2:{
        width:'100%',
        textAlign: 'center',
        display:'block',
        margin:'auto',
    },
    container2:{
        display:'flex',
        flexDirection:'row wrap',
        backgroundImage:`url(${home})`,
        position: "relative",
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundAttachment:'fixed',
    }
};

class landing extends Component {
    render (){
        const rightButtons=(
            <div>
                <LoginModal/>
            </div>
        );

        return (
            <div>
                <AppBar style={styles.header} title={<span style={styles.title}>FlappCards</span>} showMenuIconButton={false} iconElementRight={rightButtons}  />
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
