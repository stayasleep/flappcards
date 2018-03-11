import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import FlashCardsAppBar from '../../components/appBar/app_bar_with_drawer';
import DoesNotExist from '../../components/stackOverview/stack_does_not_exist';
import StackViewStacks from '../../components/stackOverview/stackoverview_stacks';
import LoadingCircle from '../../components/common/index';
import DeleteDialog from '../../components/confirmActionModal/deleteDialog';
import {deleteCard,getStackOverview, resetStackUnavailable, resetStackCards, stackCopy } from '../../actions/index';


class Stacks extends Component {
    constructor(props){
        super(props);
        this.state={
            cardView: null,
            popUpOpen: false,
            deleteDialog: false,
            card: {}
        };
        this.handleCopy = this.handleCopy.bind(this);
        this.handleCopyProhibited = this.handleCopyProhibited.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleOriginClick = this.handleOriginClick.bind(this);
        this.handleCardToggle = this.handleCardToggle.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.handleDeleteAction = this.handleDeleteAction.bind(this);
    }

    componentWillMount(){
        this.props.stackSubj ? document.title=`FlappCards - ${this.props.stackSubj} Overview` : document.title="FlappCards - Stack Overview";

    }
    componentWillReceiveProps(nextProps){

        //set titles on successive changes

        if(this.props.stackSubj !== nextProps.stackSubj){
            document.title=`FlappCards - ${nextProps.stackSubj} Overview`;
        }
        //initial load, stack undefined and next is defined
        //also works for deleting and adding cards and edits
        //stack unavailable doesnt get thru due to conditions on stackCards
        if(this.props.stackCards !== nextProps.stackCards){

            if(nextProps.stackCards) {
                //if guest views stack and then logs on, stackCards is undef and we dont want this to run
                let num = nextProps.stackCards.length;
                this.setState({cardView: Array(num).fill({showAnswer: false})});
            }
        }else if(this.props.params.sid !== nextProps.params.sid){
            //if you click on the origin source the params update, but the mounted component
            //needs to repeat its axios call for the new stack and cause rerendering
            //and then cardView is set from above
            this.props.getStackOverview(nextProps.params.sid);
        }

    }
    componentDidMount(){
        if(this.props.authenticated){
            const { sid } = this.props.params;
            //initial load, stack undefined so we make a call
            if(!this.props.stackCards){
                this.props.getStackOverview(sid);
            }else if (this.props.stackCards[0].stack_id !== Number(sid)){
                //stackCards is now defined, if not the same visit of prev stack,
                // we call axios for new stack
                this.props.getStackOverview(sid);
            }else{
                //stackCards is defined in redux, and the param matches the stackCards in redux store,
                //we could compare stackIDs of the two in conditional or keep this else statement
                //since it already exists, lets set our cardView state
                let num = this.props.stackCards.length;
                this.setState({cardView: Array(num).fill({showAnswer: false})});
                //this wont trigger willReceiveProps
            }


        }
    }
    componentWillUnmount(){
        //IFF stack unavailable, we reset the state so we dont see the unavailable msg during server load
        //for the next unique stack
        if(this.props.unavailable){
            this.props.resetStackUnavailable();
        }


    }
    handleCardToggle(index){
        const toggle = this.state.cardView.slice();
        //mutate the index position of the affected card and set the array state
        let toggleCard = toggle[index];
        toggle[index] = Object.assign({}, toggleCard, {showAnswer: !toggleCard.showAnswer});
        this.setState({cardView: toggle});
    }

    handleCopy(stackID){
        this.props.stackCopy(stackID);
    }
    handleCopyProhibited(){
        this.setState({popUpOpen: !this.state.popUpOpen});
    }
    handleDialogClose(){
        this.setState({popUpOpen: !this.state.popUpOpen});
    }

    handleOriginClick(source){
        browserHistory.push(`/stackoverview/${source}`);
    }

    //Delete Card dialog toggle switch
    toggleDelete(card){
        this.setState({deleteDialog: !this.state.deleteDialog, card: card})
    }

    //render delete dialog, would be neat if card_id could be passed as param directly and not set via state
    //less prone to user tomfoolery that way
    handleMakeDialog(card){
        return (
            <DeleteDialog
                title="Are you sure you want to delete this card from your stack?"
                confirmTitle="Delete Card"
                open={this.state.deleteDialog}
                handleClose={()=> this.setState({deleteDialog: !this.state.deleteDialog, card:{}})}
                handleDelete={() => this.handleDeleteAction(this.state.card)}
            />
        )
    }

    handleDeleteAction(flash){
        this.props.deleteCard({"stackID":flash.stack, "cardID":flash.card});
        this.setState({deleteDialog: !this.state.deleteDialog, card: {}});

    }

    render(){
        return(
            <div className="stackoverview-container">
                <FlashCardsAppBar />

                {/*When stacks DNE or wrong URL*/}
                {this.props.unavailable &&
                    <DoesNotExist />
                }

                {/*On app load, undefined*/}
                {/*When unavailable...stacks is still UNDEFINED, so it would load DNE and Loading comps*/}
                {!this.props.stackCards && !this.props.unavailable &&
                    <LoadingCircle name="StackOverview"/>
                }

                {/*Stack Exists*/}
                {/*On subsequent visits, stack is defined but local state isnt so we dont want this to render yet*/}
                {this.props.stackCards && this.state.cardView && !this.props.unavailable &&
                    <div>
                    <StackViewStacks
                        auth2Copy={this.props.authorized}
                        displayState={this.state.cardView}
                        isOwned={this.props.stackCards[0].hasOwnProperty('isOwned')}
                        stackCards={this.props.stackCards}
                        onOriginClick={this.handleOriginClick}
                        onCardToggle = {(index)=>this.handleCardToggle(index)}
                        onCopy={(stackID) => this.handleCopy(stackID)}
                        onCopyProhibited={this.handleCopyProhibited}
                        onDialogClose={this.handleDialogClose}
                        subject={this.props.stackSubj}
                        category={this.props.stackCat}
                        stackOrigin={this.props.stackCards[0].origin}
                        popUpOpen={this.state.popUpOpen}
                        onToggleDelete={this.toggleDelete}
                    />
                    {this.state.deleteDialog && this.handleMakeDialog.bind(this)()}
                    </div>
                }


            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        authenticated: state.auth.authenticated,
        authorized: state.auth.authorized,
        unavailable: state.stack.unavailable,
        newStackID: state.stack.newStackID,
        stackCards: state.stack.stackCards,
        stackCat: state.stack.course,
        stackSubj: state.stack.subj,
    }
}

export default connect(mapStateToProps,{deleteCard,getStackOverview, resetStackUnavailable, resetStackCards, stackCopy})(Stacks);