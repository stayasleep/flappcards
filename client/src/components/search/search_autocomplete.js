import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory, Link } from 'react-router';
import AutoComplete from 'material-ui/AutoComplete';
import {searchStacks, populateAutoComplete} from './../../actions/index.js';
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
        //this.props.searchStacks(search);
        browserHistory.push(`/search?q=${search}`);
    }
    componentWillMount() {
        this.props.populateAutoComplete();
    }


    render() {
        console.log('these are my auto suggests',this.props.autoCompleteSuggestions);
        const {autoCompleteSuggestions} = this.props;
        let autoLower = autoCompleteSuggestions.map((suggestion, index) => {
            return suggestion.toLowerCase();
        });
        console.log('auto low',autoLower.sort());
        autoLower = autoLower.sort();

        let setAuto = [...new Set(autoLower)];
        console.log('settttt',setAuto);

        return(
            <div>
                <AutoComplete
                    hintText="Search By Category or Subject"
                    dataSource={this.props.autoCompleteSuggestions}
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
        stacks: state.stack.stacks
    }
}
export default connect(mapStateToProps, {populateAutoComplete, searchStacks})(SearchAutoComplete);