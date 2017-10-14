import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';

import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import StackViewStacks from './stackView_stacks';
import DoesNotExist from './stack_does_not_exist';
import {getStackOverview} from '../../actions/index';
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
        this.props.getStackOverview(sid);
        document.title="FlappCards - Stack Overview";
        console.log('stack dad will mount',this.props);
        //on app load, undefined
        if(!this.props.stackCards){
            this.props.getStackOverview(sid);
        }else{
            //only make axios call for new mountings of diff stacks
            //stackCards is defined in redux and the params is string, not a number
            if(this.props.stackCards[0].stack_id !== Number(this.props.params.sid)){
                this.props.getStackOverview(sid);
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
                let num = nextProps.stackCards.length;
                this.setState({cardView: Array(num).fill({showAnswer: false})});
            }
        }else {
            let num = nextProps.stackCards.length;
            //state is null if you leave component & if you come back to the same stack stored in redux, reset its state
            if(!this.state.cardView && this.props.stackCards[0].stack_id === nextProps.stackCards[0].stack_id){
                this.setState({cardView: Array(num).fill({showAnswer: false})});
            }
            //at this point, a stack has been added to/deleted to or a new stack has been click and needs proper state
            else if(this.props.stackCards.length !== nextProps.stackCards.length){
                this.setState({cardView: Array(num).fill({showAnswer: false})});
            }
            //if you update a card, set wont reset for the entire stack :)
        }
        if(nextProps.unavailable !== this.props.unavailable){
            const {sid} = this.props.params;
            //:sid/:cid is already a path so we cant do something like, /:sid/not-available
            //with this method
            browserHistory.push(`/stackoverview/${sid}-not-found`);

        }
    }

    toggleCardDisplay(index){
        const toggle = this.state.cardView.slice();

        let toggledCard = toggle[index];
        let switchView = Object.assign({},toggledCard, {showAnswer: !toggledCard.showAnswer});
        toggle[index] = switchView;

        this.setState({cardView: toggle});
    }

    handleOriginClick(origin){
        console.log('am clickaroo',origin);
        browserHistory.push(`/stackoverview/${origin}`);
    }

    componentWillUnmount(){
        console.log('stack ov unmount');
        document.title="FlappCards";
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
        unavailable: state.stack.unavailable,
        stackCards: state.stack.stackCards,
        stackSubj: state.stack.subj,
        stackCat: state.stack.course,
        newStackID: state.stack.newStackID,
        authorized: state.auth.authorized
    }
}
export default connect(mapStateToProps,{getStackOverview})(Stacks);