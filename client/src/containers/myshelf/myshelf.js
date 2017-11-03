import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import FlashCardsAppBar from '../../components/appBar/app_bar_with_drawer';
import {getMyStackOverview, getStackOverview} from '../../actions/index';
import LoadingCircle from '../../components/common/index';
import StackList from '../../components/myShelf/stackList';
import Shelf from '../../components/myShelf/myshelf';

class MyShelf extends Component {
    componentWillMount(){
        document.title="FlappCards - My Shelf";
    }
    componentDidMount(){
        this.props.getMyStackOverview();
    }
    componentWillUnmount(){
        document.title="FlappCards";
    }

    render(){
        console.log('shelf prop',this.props);
        return(
            <div className="myshelf-container">
                <FlashCardsAppBar/>

                {/*on app load*/}
                {!this.props.stacks &&
                <LoadingCircle name="My Shelf"/>
                }

                {/*When Your Account is empty*/}
                {this.props.stacks && this.props.stacks.length === 0 &&
                <Shelf>
                    <div className="emptyRecent" style={{fontFamily: "Roboto, sans-serif"}}>
                        Looks like your shelf is empty. <Link to="/createCards">Create a stack</Link> or <Link to="/search">search the available community content</Link>
                    </div>
                </Shelf>
                }

                {/*Account is populated*/}
                {this.props.stacks && this.props.stacks.length>0  &&
                <Shelf>
                    {this.props.stacks.map((item, index)=>{
                        return (<StackList item={item} key={index}/>);
                    })}
                </Shelf>
                }

            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        stacks: state.stack.stacks
    }
}

export default connect(mapStateToProps, {getMyStackOverview, getStackOverview})(MyShelf);