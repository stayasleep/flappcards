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
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class Stacks extends Component {

    componentWillMount(){
        this.props.getMyStackOverview();
    }


    render() {
        if(!this.props.stacks){
            return <div>Loading...</div>
        }
        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <TableRow  key={index}>
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
            <div>
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

                <List>
                    <ListItem
                        leftAvatar={<p>10</p>}
                        primaryText="Subject"
                        secondaryText={<p>Category</p>}
                        secondaryTextLines={3}
                    />

                </List>
            </div>
        );


    }
}
function mapStateToProps(state) {

    return {
        stacks: state.stack.stacks
    }
}

export default connect(mapStateToProps, {getMyStackOverview, getStackOverview})(Stacks);