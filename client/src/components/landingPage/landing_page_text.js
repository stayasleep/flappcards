import React from 'react';
// import {infoText, infoTextExtendedContainerDiv, infoExtendedTextDiv, mobileIntro, paperRight, registrationPaper} from '../styles/landing_page.css';

const LandingPageInfoText = function() {
    return(
        <div className="registrationPaper">
            <div id="mobileIntro" className="infoTextExtendedDivMobile">
                <h3 className="infoText noMarginTop">The #1 Flashcard-App Around!</h3>
                <h3 className="infoText">Find more of what you're looking for on FlappCards,</h3>
                <h3 className="infoText">Join Today!</h3>
            </div>
            <div className="infoTextExtendedContainerDiv">
                <div id="Intro" className="infoTextExtendedDiv">
                    <h1 className="infoText noMarginTop">The Flashcard App For The Modern Day!</h1>
                    <h3 className="infoText">Create personalized study stacks or search new topics at the click of a button.</h3>
                    {/*<h3 className="infoText">Our mission is to make learning easier for everybody.</h3>*/}
                    <h3 className="infoText">Improve your grades by studying with FlappCards.  It's easy to use, fun, and always free!</h3>
                    {/*<h3 className="infoText">Find more of what you're looking for on FlappCards,</h3>*/}
                    <h3 className="infoText">Join Today!</h3>
                </div>
            </div>
        </div>
    )
};

export default LandingPageInfoText;