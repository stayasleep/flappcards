import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getFeaturedStackOverview} from '../../actions/index';
import {List} from 'material-ui';
import Subheader from 'material-ui/Subheader';
import {subHeader} from '../utilities/stackSummaryStyle';
import StackSummary from '../utilities/renderStackSummary';

class FlappFeatured extends Component{
    componentWillMount(){
        this.props.getFeaturedStackOverview();
    }

    render(){
        console.log('feat props',this.props);
        if(this.props.featuredStacks){
            console.log('stackSumm is true');
            return(
                <StackSummary cardStack={this.props.featuredStacks} title={"Popular Stacks"}/>
            )
        }else if(this.props.featuredErr){
            console.log('feat err is true');
            return(
                <List>
                    <Subheader style={subHeader}>Popular Stacks</Subheader>
                    <div className="emptyRecent" style={{fontFamily: "Roboto, sans-serif"}}>
                        There's tons of neat stacks to checkout. <Link to="/Search">Search</Link> around the
                        community and checkout what's happening today!
                    </div>
                </List>
            )
        }else{
            console.log('null being returned');
            return null;
        }
    }
}

function mapStateToProps(state){
    return{
        featuredStacks: state.stack.featStack,
        featuredErr: state.stack.featErr,
    }
}

export default connect(mapStateToProps,{getFeaturedStackOverview})(FlappFeatured);