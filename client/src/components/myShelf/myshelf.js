import React from 'react';
import Paper from 'material-ui/Paper';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {subHeader} from '../utilities/stackSummaryStyle';

const Shelf = (props) =>{
    return(
        <List style={{textAlign: "center"}}>
            <Subheader style={subHeader}>My Shelf</Subheader>
            {props.children}
        </List>
    )
};

export default Shelf;