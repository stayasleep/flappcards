import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router';
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
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {searchStacks, populateAutoComplete} from '../../actions/index'

class Search extends Component {

    componentWillMount(){
        document.body.style.backgroundColor="#f0f0f0";
        document.title="FlappCards - Search Page";
    }
    componentWillUnmount(){
        document.title="FlappCards";
    }


    render(){
        console.log('search render',this.props);
            const stacksList = this.props.stacks.map((item, index) => {
                console.log('inside first stacklist',item);
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
                            <TableHeaderColumn style={{textAlign:"center"}}>Title</TableHeaderColumn>
                            <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Creator</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>Total Cards</TableHeaderColumn>
                            <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Total Views</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign:"center"}}>See More</TableHeaderColumn>
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
                                <TableHeaderColumn style={{textAlign:"center"}}>Title</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Creator</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Total Cards</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>Total Views</TableHeaderColumn>
                                <TableHeaderColumn style={{textAlign:"center"}}>See More</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                        </TableBody>
                    </Table>
                        <p>
                            We&apos;re sorry, we found 0 stacks matching [[your search result]].  Please try a new search or take a look at our popular
                            stacks [[javascript link for search]] , [[react link for search]]
                        </p>
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



export default connect(mapStateToProps, {searchStacks, populateAutoComplete})(Search);