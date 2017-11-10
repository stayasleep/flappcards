import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';


const SearchTable = (props) => {
    return (
        <Table>
            <TableHeader displaySelectAll={false}  adjustForCheckbox={false}>
                <TableRow style={{backgroundColor:"white"}}>
                    <TableHeaderColumn style={{textAlign:"center"}}>Title</TableHeaderColumn>
                    <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Creator</TableHeaderColumn>
                    <TableHeaderColumn style={{textAlign:"center"}}>Total Cards</TableHeaderColumn>
                    <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Total Views</TableHeaderColumn>
                    <TableHeaderColumn style={{textAlign:"center"}}>See More</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {props.children}
            </TableBody>
        </Table>
    )
};

export default SearchTable