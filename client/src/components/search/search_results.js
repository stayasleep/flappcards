import React from 'react';
import { Link } from 'react-router';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';


const SearchResults = (props) => {
    return (
        <TableRow style={{textAlign:"center"}}>
            <TableRowColumn className="tableSubj">{props.item.subject}: {props.item.category}</TableRowColumn>
            <TableRowColumn className="tableStyle tableHidden">{props.item.orig_source_stack}</TableRowColumn>
            <TableRowColumn className="tableStyle">{props.item.totalCards}</TableRowColumn>
            <TableRowColumn className="tableStyle tableHidden">{props.item.rating}</TableRowColumn>
            <TableRowColumn className="tableStyle">
                <IconButton containerElement={<Link to={`/stackOverview/${props.item.stack_id}`} name="stackOverview"/>}>
                    <RemoveRedEye hoverColor={green500}/>
                </IconButton>
            </TableRowColumn>
        </TableRow>
    )
};

export default SearchResults;