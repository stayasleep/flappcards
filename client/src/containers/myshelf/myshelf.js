import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import FlashCardsAppBar from '../../components/appBar/app_bar_with_drawer';
import {deleteStack,getMyStackOverview, getStackOverview,resetStackCards} from '../../actions/index';
import LoadingCircle from '../../components/common/index';
import StackList from '../../components/myShelf/stackList';
import Shelf from '../../components/myShelf/myshelf';
import DeleteDialog from '../../components/confirmActionModal/deleteDialog';

class MyShelf extends Component {
    constructor(props){
        super(props);
        this.state={
            deleteDialog:false,
            jStack: null,
        };
        this.toggleDeleteHandler = this.toggleDeleteHandler.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentWillMount(){
        document.title="FlappCards - My Shelf";
    }
    componentDidMount(){
        console.log('mouting shelf',this.props);
        //on route load without token, prevent this from going off
        if(this.props.authorized) {
            this.props.getMyStackOverview();
        }
    }
    componentWillUnmount(){
        document.title="FlappCards";
    }


    //Dialog action buttons can share between setting and nullifying state
    toggleDeleteHandler(num){
        if(num){
            this.setState({deleteDialog: !this.state.deleteDialog, jStack:num });
        }else{
            this.setState({deleteDialog: !this.state.deleteDialog, jStack: null });
        }
    }
    //Dialog action handler:local state has stack id, only proceed if id is passed with component,
    //Dialog can be triggered with react tools and then axios may go off without conditional as safeguard
    handleDelete(num){
        if(num){
            //check to see if stack deleted is the one still in stackCards reducer
            //ensures if it is, travelling backwards will render the unavailable component
            if(this.props.overviewID && this.props.overviewID[0].stack_id === num){
                this.props.resetStackCards();
            }
            this.props.deleteStack(num);
        }
        this.setState({deleteDialog: !this.state.deleteDialog, jStack: null});
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
                        return (<StackList item={item} key={index} onToggleDelete={this.toggleDeleteHandler}/>);
                    })}
                    <DeleteDialog
                        open={this.state.deleteDialog}
                        title="Are you sure you want to delete this stack?"
                        confirmTitle="Delete Stack"
                        handleClose={()=>this.toggleDeleteHandler()}
                        handleDelete={()=>this.handleDelete(this.state.jStack)}
                    />
                </Shelf>
                }

            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        authorized: state.auth.authorized,
        stacks: state.stack.stacks,
        overviewID: state.stack.stackCards
    }
}

export default connect(mapStateToProps, {deleteStack,getMyStackOverview, getStackOverview,resetStackCards})(MyShelf);