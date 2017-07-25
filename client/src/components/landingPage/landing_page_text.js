import React from 'react';
import Paper from 'material-ui/Paper';
import {infoText, infoTextExtendedContainerDiv, infoExtendedTextDiv, mobileIntro, paperRight, registrationPaper} from '../styles/landing_page.css';

const LandingPageInfoText = function() {
    return(
        <Paper className="registrationPaper" zDepth={1}>
        <div id="mobileIntro" className="infoTextExtendedDiv">
            {/*<h1 style={styles.mTitle}>FL<span style={styles.midT}>APP</span>CARDS</h1>*/}
            <h3 className="infoText">The #1 Flashcard-App Around!</h3>
            <h3 className="infoText">Find more of what you're looking for on FlappCards,</h3>
            <h3 className="infoText">Join Today!</h3>
        </div>
        <div className="infoTextExtendedContainerDiv">
            <div id="Intro" className="infoTextExtendedDiv">
                {/*<h1 style={styles.mTitle}>FL<span style={styles.midT}>APP</span>CARDS</h1>*/}
                <h3 className="infoText">The #1 Flashcard-App Around!</h3>
                <h3 className="infoText">Create personalized study stacks or search new topics at the click of a button.</h3>
                <h3 className="infoText">Our mission is to make learning easier for everybody.</h3>
                <h3 className="infoText">Improve your grades by studying with FlappCards.  It's easy to use, fun, and always free!</h3>
                <h3 className="infoText">Find more of what you're looking for on FlappCards,</h3>
                <h3 className="infoText">Join Today!</h3>
            </div>
        </div>
    </Paper>)

};

export default LandingPageInfoText;