import React, {Component} from 'react';
import {connect} from 'react-redux'
import { browserHistory, Link} from 'react-router';
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
import {searchStacks, populateAutoComplete, unmountSearch} from '../../actions/index'

class Search extends Component {

    componentWillMount(){
        document.title="FlappCards - Search Page";
        const {query} = this.props.location;
        //search?q=term
        if(Object.keys(query).length !== 0){
            if(Object.keys(query)[0] === "q" && query.q) {
                const queried = query.q;
                this.props.searchStacks(queried);
            }else{
                browserHistory.push('/search');
            }
        }
    }
    //Receives props from the AutoSearch component when you submit one or multiple searches, and their
    //edge cases to make sure the url changes and the axios still fires off.
    componentWillReceiveProps(nextProps){
        if(!this.props.location.search) {
            if (this.props.location.search !== nextProps.location.search) {
                const {query} = nextProps.location;
                this.props.searchStacks(query.q);
            }
        }else if(Object.keys(this.props.location.query)[0] === "q" && this.props.location.query.q){
            if(this.props.location.search !== nextProps.location.search){
                const {query} = nextProps.location;
                this.props.searchStacks(query.q);
            }
        }
    }
    //resets Search so you can navigate back to a blank view
    componentWillUnmount(){
        this.props.unmountSearch();
    }
    renderStacksList(){
        return this.props.searched.map((item, index) => {
            return (
                <TableRow key={index} className="tableStyle">
                    <TableRowColumn className="tableSubj">{item.subject}: {item.category}</TableRowColumn>
                    <TableRowColumn className="tableStyle tableHidden">{item.orig_source_stack}</TableRowColumn>
                    <TableRowColumn className="tableStyle">{item.totalCards}</TableRowColumn>
                    <TableRowColumn className="tableStyle tableHidden">{item.rating}</TableRowColumn>
                    <TableRowColumn className="tableStyle">
                        <IconButton
                            containerElement={<Link to={`/stackOverview/${this.props.searched[index].stack_id}`}
                                                    name="stackOverview"/>}>
                            <RemoveRedEye hoverColor={green500}/>
                        </IconButton>
                    </TableRowColumn>
                </TableRow>
            )
        });
    }

    render(){
        const tableHead = (
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
        );

        if(!this.props.searched) {
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
                        {tableHead}
                        <p>
                            Search the available stacks by Category or Subject and click on "see more" to browse the selected result!
                        </p>
                    </Paper>
                </div>
            )
        }else if(this.props.searched) {
            if(this.props.searched.length > 0){
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
                                    {this.renderStacksList.bind(this)()}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                )
            }else{
                return (
                    <div>
                        <FlashCardsAppBar/>
                        <Paper style={{"textAlign":"center","padding":"1em","margin":"2em"}}>
                            <SearchAutoComplete />
                            {tableHead}
                            <p>
                                We&apos;re sorry, we found 0 stacks matching <em className="noMatchFound">{this.props.location.query.q}</em>.
                            </p>
                        </Paper>
                    </div>
                )
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        stacks: state.stack.stacks,
        searched: state.stack.searched
    }
}


export default connect(mapStateToProps, {searchStacks, populateAutoComplete, unmountSearch})(Search);