import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

class Stacks extends Component {

    componentWillMount(){
        this.props.getMyStackOverview();
    }

    viewStack(stackInfo) {
        console.log("stackID", stackInfo.stack_id);
        console.log("this.props.stacks", this.props.stacks);
        this.props.getStackOverview(stackInfo.stack_id);

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
                        <RaisedButton
                            containerElement={<Link to={`/stackOverview/${this.props.stacks[index].stack_id}`} name="stackOverview"/>}>
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

export default connect(mapStateToProps, {getMyStackOverview, getStackOverview})(Stacks);