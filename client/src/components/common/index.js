import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { subHeader } from '../utilities/stackSummaryStyle';


const LoadingCircle = (props) =>{
    return (
        <List>
            <Subheader style={subHeader}>{props.name}</Subheader>
            <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif"}}>
                <CircularProgress size={80} thickness={6} />
            </div>
        </List>
    )
};

export default LoadingCircle;