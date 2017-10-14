import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';

import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import StackViewStacks from './stackView_stacks';
import DoesNotExist from './stack_does_not_exist';
import {getStackOverview,initiateGuestBrowsing} from '../../actions/index';
import {connect} from 'react-redux';

class Stacks extends Component {

    constructor(props){
        super(props);
        this.state = {
            cardView: null,
        };
        this.toggleCardDisplay = this.toggleCardDisplay.bind(this);
        this.handleOriginClick = this.handleOriginClick.bind(this);
    }

    componentWillMount() {
        const { sid } = this.props.params;
        // !(localStorage.getItem('token')) ? browserHistory.push('/'): null;
        console.log('am i autheticated',this.props.authenticated);

        document.title="FlappCards - Stack Overview";
        console.log('stack dad will mount',this.props);
        if(!this.props.authenticated){
            browserHistory.push('/');
        }else {
            //on app load, undefined
            if (!this.props.stackCards) {
                console.log('will mount und');
                this.props.getStackOverview(sid);
            } else if (this.props.stackCards[0].stack_id !== Number(this.props.params.sid)) {
                console.log('will mount else else');
                //only make axios call for new mountings of diff stacks
                //stackCards is defined in redux and the params is string, not a number
                this.props.getStackOverview(sid);
            } else {
                //stackcards already exists, so it is a return visit of a prev mounted stack
                let num = this.props.stackCards.length;
                this.setState({cardView: Array(num).fill({showAnswer: false})});
            }
        }


    }

    componentWillReceiveProps(nextProps){
        console.log('nexo',nextProps);
        console.log('is this tho',this.props);
        if(this.props.stackSubj !== nextProps.stackSubj){
            document.title=`FlappCards - Stack: ${nextProps.stackSubj}`;
        }

        //initial load, stackCards undefined
        if(!this.props.stackCards){
            if(this.props.stackCards !== nextProps.stackCards){
                console.log('inside the if if');
                let num = nextProps.stackCards.length;
                this.setState({cardView: Array(num).fill({showAnswer: false})});
            }
        }else {
            let num = nextProps.stackCards.length;
            if(!this.state.cardView && this.props.stackCards[0].stack_id !== nextProps.stackCards[0].stack_id){
                //if you went to stack X, go home, and then go to Stack Y
                this.setState({cardView: Array(num).fill({showAnswer: false})});
            }
            else if(this.props.stackCards.length !== nextProps.stackCards.length){
                //at this point, a stack has been added to/deleted to or a new stack has been click and needs proper state; ignore card update state reset
                this.setState({cardView: Array(num).fill({showAnswer: false})});
            }
        }

        if(nextProps.unavailable !== this.props.unavailable && this.props.unavailable == false){
            const {sid} = this.props.params;
            //:sid/:cid is already a path so we cant do something like, /:sid/not-available with this method
            browserHistory.push(`/stackoverview/${sid}-not-found`);
        }
    }

    componentWillUnmount(){
        console.log('stack ov unmount');
        document.title="FlappCards";
        //this needs something to go to reducers and make stacks.unavailable reset again
    }

    toggleCardDisplay(index){
        const toggle = this.state.cardView.slice();

        let toggledCard = toggle[index];
        let switchView = Object.assign({},toggledCard, {showAnswer: !toggledCard.showAnswer});
        toggle[index] = switchView;
        this.setState({cardView: toggle});
    }

    handleOriginClick(origin){
        console.log('just a click');
        //need url to change and need to do http req, is this the best way?
        browserHistory.push(`/stackoverview/${origin}`);
        this.props.getStackOverview(origin);

    }

    //sending authorized [[allows copy]] and stackCards as props to next component
    render() {
        return (
            <div>
                <FlashCardsAppBar/>
                <StackViewStacks
                    unavailable={this.props.unavailable}
                    authCopy={this.props.authorized}
                    displayState={this.state.cardView}
                    action={(index) => this.toggleCardDisplay(index)}
                    initialValues={{subject: this.props.stackSubj, category: this.props.stackCat}}
                    stackCards={this.props.stackCards}
                    handleOriginClick={this.handleOriginClick}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        unavailable: state.stack.unavailable,
        stackCards: state.stack.stackCards,
        stackSubj: state.stack.subj,
        stackCat: state.stack.course,
        newStackID: state.stack.newStackID,
        authorized: state.auth.authorized
    }
}
export default connect(mapStateToProps,{getStackOverview,initiateGuestBrowsing})(Stacks);