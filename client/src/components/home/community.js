import React from 'react';
import Paper from 'material-ui/Paper';
import StackSummary from '../utilities/renderStackSummary';

const Community = (props) => {
    return (
        <Paper className="communityPaper" style={{textAlign: "center", margin:"2em 0"}} zDepth={2}>
            <h2>FlappCards Random</h2>
            <p>Random stacks, each and every time</p>
            <StackSummary cardStack={props.community}/>
        </Paper>
    )
};

export default Community;