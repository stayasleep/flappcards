import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import SearchAutoComplete from '../../components/search/search_autocomplete';
import FlashCardsAppBar from '../../components/appBar/app_bar_with_drawer';
import SearchTable from '../../components/search/search_table';
import SearchResults from '../../components/search/search_results';
import NoResults from '../../components/search/empty_search';
import {initiateGuestBrowsing,searchStacks, populateAutoComplete, unmountSearch} from '../../actions/index'

class Search extends Component {
    static contextTypes ={
        router: PropTypes.object,
    };
    constructor(props){
        super(props);
        //this.renderStackList = this.renderStackList.bind(this);
    }

    componentWillMount(){
        document.title = "FlappCards - Search Page";
    }
    componentWillReceiveProps(nextProps){
        console.log('search this',this.props);
        console.log('search next', nextProps);
        if(!this.props.location.search) {
            if (this.props.location.search !== nextProps.location.search) {
                console.log('will rec props first');
                const {query} = nextProps.location;
                this.props.searchStacks(query.q);
            }
        }else if(Object.keys(this.props.location.query)[0] === "q" && this.props.location.query.q){
            if(this.props.location.search !== nextProps.location.search){
                console.log('will rec props second');
                const {query} = nextProps.location;
                console.log('querrry',query);
                //this conditional is in case you click on the app drawer, location.query is empty and it fires off an axios call
                //and changes the url...we dont want that. this is an ugly but temp fix
                if(query.q) {
                // if(Object.prototype.hasOwnProperty.call(query, 'q')){
                    this.props.searchStacks(query.q);
                }else{
                    //click on app drawer and redirected to /shelf...so we take the previous props and push you back to
                    //mimic the same view as if nothing had to reload again
                    this.context.router.push(`/search${this.props.location.search}`);
                }
            }
        }
    }
    componentDidMount(){
        document.title="FlappCards - Search Page";
        console.log('will mount search',this.props);
        //this page requires authentication, aka any token to succeed
        const {query} = this.props.location;
        //search?q=term
        if(this.props.authenticated) {
            if (Object.keys(query).length !== 0) {
                if (Object.keys(query)[0] === "q" && query.q) {
                    const queried = query.q;
                    this.props.searchStacks(queried);
                } else {
                    //in case client does search?jas=hello, we redirect them to /search
                    browserHistory.push('/search');
                }
            }
        }
    }
    //reset the search term to allow for default view again
    componentWillUnmount(){
        this.props.unmountSearch();
    }

    renderStackList(){
        return this.props.searched.map((item,index)=>{
            return <SearchResults key={index} item={item}/>
        })
    }

    render(){
        return(
            <div className="search-container">
                <FlashCardsAppBar/>
                <Paper style={{padding:"1em", margin:"2em"}}>

                    {/*autocomplete button goes here*/}
                    <SearchAutoComplete term={this.props.location.query}/>
                    <SearchTable>
                        {/*Server returns successful search results*/}
                        {this.props.searched && this.props.searched.length > 0 &&
                            this.renderStackList()
                        }
                    </SearchTable>

                    {/*Initial visit before searching*/}
                    {!this.props.searched &&
                    <p>
                        Search the available stacks by Category or Subject and click on "see more" to browse the selected result!
                    </p>
                    }

                    {/*Search returns 0 results*/}
                    {this.props.searched && this.props.searched.length === 0 &&
                    <NoResults
                        term={this.props.location.query.q}
                    />
                    }

                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated,
        searched: state.stack.searched,
    }
}

export default connect(mapStateToProps, {initiateGuestBrowsing, searchStacks, populateAutoComplete, unmountSearch})(Search);