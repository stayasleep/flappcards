import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyStackOverview} from '../../actions/index'
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

    render() {
        if(!this.props.stacks){
            return <div>Loading...</div>
        }
        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableRowColumn>{item.subject}: {item.category}</TableRowColumn>
                    <TableRowColumn>{item.totalCards}</TableRowColumn>
                    <TableRowColumn>{item.stackRating}</TableRowColumn>
                    <TableRowColumn>
                        <Link to="/stackOverview" name="stackOverview"><RaisedButton>
                            View
                        </RaisedButton></Link>
                    </TableRowColumn>
                    <TableRowColumn>
                            <DeleteStackConfirm/>
                    </TableRowColumn>
                </TableRow>
            )
        });
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Subjects</TableHeaderColumn>
                        <TableHeaderColumn>Number of Cards</TableHeaderColumn>
                        <TableHeaderColumn>Rating</TableHeaderColumn>
                        <TableHeaderColumn>View</TableHeaderColumn>
                        <TableHeaderColumn>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
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