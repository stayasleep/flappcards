import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton'
import {searchStacks} from '../../actions/index'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import renderInput from '../utilities/renderInput';

class Search extends Component {

    handleSearch(search){
        this.props.searchStacks(search);
    }

    render(){
        const styles = {
            textAlign: "center"

        };
        const { handleSubmit } = this.props;
            const stacksList = this.props.stacks.map((item, index) => {
                return (
                    <TableRow key={index} style={styles}>
                        <TableRowColumn style={styles}>{item.subject}: {item.category}</TableRowColumn>
                        <TableRowColumn style={styles}>{item.orig_source_stack}</TableRowColumn>
                        <TableRowColumn style={styles}>{item.totalCards}</TableRowColumn>
                        <TableRowColumn style={styles}>{item.rating}</TableRowColumn>
                        <TableRowColumn style={styles}>
                            <RaisedButton
                                containerElement={<Link to={`/stackOverview/${this.props.stacks[index].stack_id}`}
                                                        name="stackOverview"/>}>
                                View
                            </RaisedButton>
                        </TableRowColumn>
                    </TableRow>
                )
            });
        if(this.props.stacks.length > 0) {
        return (
            <div>
                <FlashCardsAppBar/>
                <Paper>
                <form onSubmit={handleSubmit((values) => {this.handleSearch(values)})}>
                    <Field name="Search" component={renderInput} label="Search Category or Subject"/>
                    <RaisedButton type="submit" label="Search"/>
                </form>
                <Table style={styles}>
                    <TableHeader style={{textAlign:"center", displaySelectAll: "false"}}>
                        <TableRow>
                            <TableHeaderColumn style={{textAlign:"center"}}>Subjects</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Created By</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Number of Cards</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Rating</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>View</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody style={{displayRowCheckbox: "false"}}>
                        {stacksList}
                    </TableBody>
                </Table>
                </Paper>
            </div>
        )
        }
        else {
            return (
                <div>
                    <FlashCardsAppBar/>
                    <Paper>
                    <form onSubmit={handleSubmit((values) => {this.handleSearch(values)})}>
                        <Field name="Search" component={renderInput} label="Search Category or Subject"/>
                        <RaisedButton type="submit" label="Search"/>
                    </form>
                    <Table>
                        <TableHeader style={{displaySelectAll: false}}>
                            <TableRow>
                                <TableHeaderColumn style={{textAlign:"center"}}>Subjects</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Created By</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Number of Cards</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Rating</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>View</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody style={{displayRowCheckbox: "false"}}>
                        </TableBody>
                    </Table>
                    Sorry, there are no Stacks by that name or category.
                    </Paper>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        stacks: state.stack.stacks
    }
}

Search = reduxForm({
    form: 'Search',
})(Search);

export default connect(mapStateToProps, {searchStacks})(Search);