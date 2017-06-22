import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {Link} from 'react-router';

import {searchStacks, populateAutoComplete} from '../../actions/index'
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
import SearchAutoComplete from './search_autocomplete';

class Search extends Component {

    componentWillMount(){
        document.body.style.backgroundColor="#f0f0f0";
    }


    render(){

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
                <Paper style={{"textAlign": "center" ,"padding": "1em", "margin":"2em","backgroundColor":"white"}}>
                    <SearchAutoComplete />


                <Table className="tableStyle">
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow style={{backgroundColor:"white"}}>
                            <TableHeaderColumn style={{textAlign:"center"}}>Subject</TableHeaderColumn>
                            <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Creator</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Card #</TableHeaderColumn>
                            <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Rating</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>View</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody style={{backgroundColor:"white"}} displayRowCheckbox={false}>
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
                    <Paper style={{
                        textAlign: "center",
                        padding: "1em",
                        margin: "2em",
                        backgroundColor:"white",
                    }}>
                        <SearchAutoComplete />

                    <Table>
                        <TableHeader displaySelectAll={false}  adjustForCheckbox={false}>
                            <TableRow style={{backgroundColor:"white"}}>
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
                        <p>Sorry, there are no Stacks by that name or category.</p>                    </Paper>
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



export default connect(mapStateToProps, {searchStacks, populateAutoComplete})(Search);