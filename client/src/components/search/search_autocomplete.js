import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {connect} from 'react-redux';
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
        this.props.searchStacks(search);

    }
    componentWillMount() {
        this.props.populateAutoComplete();
    }


    render() {
        return(
            <div>
                <AutoComplete
                    hintText="Search categories or subject "
                    dataSource={this.props.autoCompleteSuggestions}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={(searchText) => this.handleSearch(searchText)}
                    onUpdateInput={(searchText) => {this.setState({searchText: searchText})}}
                />
                <RaisedButton type="button" label="Search" onClick={()=> {this.handleSearch(this.state.searchText)}} />
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