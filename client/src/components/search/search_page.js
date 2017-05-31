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
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';
import {medium, mediumIcon, rightAvatar} from '../utilities/stackSummaryStyle';
import renderInput from '../utilities/renderInput';

class Search extends Component {

    handleSearch(search){
        this.props.searchStacks(search);
    }

    render(){
        const { handleSubmit } = this.props;
            const stacksList = this.props.stacks.map((item, index) => {
                return (
                    <TableRow key={index} className="tableStyle">
                        <TableRowColumn className="tableSubj">{item.subject}: {item.category}</TableRowColumn>
                        <TableRowColumn className="tableStyle tableHidden">{item.orig_source_stack}</TableRowColumn>
                        <TableRowColumn className="tableStyle">{item.totalCards}</TableRowColumn>
                        <TableRowColumn className="tableStyle tableHidden">{item.rating}</TableRowColumn>
                        <TableRowColumn className="tableStyle">
                            <IconButton containerElement={<Link to={`/stackOverview/${this.props.stacks[index].stack_id}`} name="stackOverview"/>}>
                                <RemoveRedEye hoverColor={green500} />
                            </IconButton>
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
                <Table className="tableStyle">
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={{textAlign:"center"}}>Subject</TableHeaderColumn>
                            <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Creator</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Card #</TableHeaderColumn>
                            <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Rating</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>View</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
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
                        <TableHeader displaySelectAll={false}  adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{textAlign:"center"}}>Subject</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Creator</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Card #</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Rating</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>View</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
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