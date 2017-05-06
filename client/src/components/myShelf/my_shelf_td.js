import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyStackOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router';
import DeleteStackConfirm from '../confirmActionModal/deleteStack'
import RaisedButton from 'material-ui/RaisedButton'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class Stacks extends Component{
    componentWillMount(){
        this.props.getMyStackOverview();
    }

    viewStack(stackInfo) {

        // Convert the table data for that row into JSON, so I can pull the stack ID key value
        console.log("event.target.response", event.target.response);
        console.log("stackID", stackID);
        let stackID = this.props.stacks[index];
        this.props.getStackOverView(stackID);
    }

    render() {
        if(!this.props.stacks){
            return <div>Loading...</div>
        }
        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <TableRow selectable={false} key={index}>
                    <TableRowColumn>{item.subject}: {item.category}</TableRowColumn>
                    <TableRowColumn>{item.totalCards}</TableRowColumn>
                    <TableRowColumn>{item.stackRating}</TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton onClick={this.viewStack(event.target)}>
                            View
                        </RaisedButton>
                    </TableRowColumn>
                    <TableRowColumn>
                            <DeleteStackConfirm stackID={this.props.stacks[index]}/>
                    </TableRowColumn>
                </TableRow>
            )
        });
        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Subjects</TableHeaderColumn>
                        <TableHeaderColumn>Number of Cards</TableHeaderColumn>
                        <TableHeaderColumn>Rating</TableHeaderColumn>
                        <TableHeaderColumn>View</TableHeaderColumn>
                        <TableHeaderColumn>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {stacksList}
                </TableBody>
            </Table>
        );
    }
}
function mapStateToProps(state) {
    return {
        stacks: state.stack.stacks
    }
}

export default connect(mapStateToProps, {getMyStackOverview})(Stacks);