import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import StackSummary from '../utilities/renderStackSummary';

const Recent = (props) => {
    return(
        <div className="recent-container" style={{textAlign: "center"}}>
            <Paper className="userWelcome" zDepth={2}>
                <h2>Welcome Back</h2>
                <p>Here&apos;s your recent stack activity:</p>
                <StackSummary cardStack={props.recent} />
            </Paper>
            <div className="middleRecentContainer">
                <div className="middleRecentCreate">
                    <h2>Create a study stack</h2>
                    <p>Study smart! Create a study stack and get started today.</p>
                    <div className="divButton">
                        <Link className="linkBtnGreen" to="/createCards" name="Create Stack">Create Stack</Link>
                    </div>
                </div>
                <div className="middleRecentSearch">
                    <h2>Learn something new today!</h2>
                    <p>Take a look at some of the great stacks created by FlappCard members.</p>
                    <div className="divButton">
                        <Link className="linkBtn" to="/search">Search Stacks</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Recent;