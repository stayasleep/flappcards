import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import {searchStacks} from '../../actions/index'
import {connect} from 'react-redux'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class Search extends Component{

    renderInput({input, label, meta: {touched, error}}){
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       {...input}
            />
        )
    }

    handleSearch(search){
        this.props.searchStacks(search);
    }

    render(){
        const { handleSubmit } = this.props;
        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableRowColumn>{item.subject}: {item.category}</TableRowColumn>
                    <TableRowColumn>{item.orig_source_stack}</TableRowColumn>
                    <TableRowColumn>{item.totalCards}</TableRowColumn>
                    <TableRowColumn>{item.rating}</TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            containerElement={<Link to={`/stackOverview/${this.props.stacks[index].stack_id}`} name="stackOverview"/>}>
                            View
                        </RaisedButton>
                    </TableRowColumn>
                    <TableRowColumn>
                    </TableRowColumn>
                </TableRow>
            )
        });

        return (
            <div>
                <FlashCardsAppBar/>
                <form onSubmit={handleSubmit((values) => {this.handleSearch(values)})}>
                    <Field name="Search" component={this.renderInput} label="Search Category or Subject"/>
                    <RaisedButton type="submit" label="Search"/>
                </form>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Subjects</TableHeaderColumn>
                            <TableHeaderColumn>Created By</TableHeaderColumn>
                            <TableHeaderColumn>Number of Cards</TableHeaderColumn>
                            <TableHeaderColumn>Rating</TableHeaderColumn>
                            <TableHeaderColumn>View</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stacksList}
                    </TableBody>
                </Table>
            </div>
        )
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