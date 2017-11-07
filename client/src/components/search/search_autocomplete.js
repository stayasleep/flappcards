import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory, Link } from 'react-router';
import AutoComplete from 'material-ui/AutoComplete';
import {populateAutoComplete} from './../../actions/index.js';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton'

class SearchAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }


    handleSearch(search){
        console.log('search',search.length);
        //prevent blank and white space submissions?
        switch(true) {
            case search.length === 0:
                break;

            case /^\s+$/.test(search):
                break;
            default:
                console.log('winner');
                browserHistory.push(`/search?q=${search}`);
        }
    }

    componentWillMount() {
        this.props.populateAutoComplete();
    }


    render() {

        const {autoCompleteSuggestions} = this.props;
        let autoLower = autoCompleteSuggestions.map((suggestion, index) => {
            return suggestion.toLowerCase();
        });
        autoLower = autoLower.sort();
        //some things in server already have white space, :doh:
        let trimAutoArray = autoLower.map((searched) => {
            return searched.trim();
        });

        let setAuto = [...new Set(trimAutoArray)]; //removes duplicates, ES6

        return(
            <div style={{textAlign:"center"}}>
                <AutoComplete
                    searchText={this.state.searchText === "" ? this.props.term.q : this.state.searchText} //if you search a stack, view it, and hit back button...input field is blank with results. this poulates the input field again
                    hintText="Search By Category or Subject"
                    dataSource={setAuto}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={(searchText) => this.handleSearch(searchText)}
                    onUpdateInput={(searchText) => {this.setState({searchText: searchText})}}
                />
                <RaisedButton type="button" label="Search" style={{margin:"0 2em"}} primary={true} onClick={()=> {this.handleSearch(this.state.searchText)}} />
            </div>
        )
    }
}


// default values so the auto complete can mount while the asynchronous axios data is processed
SearchAutoComplete.defaultProps = {
    autoCompleteSuggestions: ["JavaScript", "React", "Redux", "CSS", "HTML"]
};

// Make sure that the autoCompleteSuggestions prop is an array
SearchAutoComplete.propTypes = {
    autoCompleteSuggestions: PropTypes.array.isRequired
};


function mapStateToProps(state) {
    return {
        autoCompleteSuggestions: state.stack.autoCompleteSuggestions, // state.reducerName.keyThatAppearsInReducer
    }
}
export default connect(mapStateToProps, {populateAutoComplete})(SearchAutoComplete);