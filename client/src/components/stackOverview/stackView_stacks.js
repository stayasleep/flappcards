import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getStackOverview, stackCopy} from '../../actions/index'
import DeleteCardConfirm from '../confirmActionModal/deleteCard'
import EditCard from '../editCard/edit';
import AddCard from '../editCard/add';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';
import Divider from 'material-ui/Divider';
import {cardHeader, cardDivider, singleCard, cardText, questionText, stackOverviewCardActions, answerText, chip, mediumIcon, medium, header } from '../utilities/stackSummaryStyle';
import Paper from 'material-ui/Paper';

import {cardStackList, contentCopy, loadingIcon} from './../styles/stackOverview.css' // import CSS for styling
import CircularProgress from 'material-ui/CircularProgress';

class StackViewStacks extends Component{

    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        expanded: false
    };

    handleCopy(copy){
        this.props.stackCopy(copy);
    };

    handleExpansion(cardIndex) {


        // console.log("cardIndex", cardIndex); // passed in via the key gotten from map
        // if !(F) => if T
        if (!this.state.expanded) {
            this.setState({expanded: true});
            // to target the one clicked
            // document.getElementByClassName returns an array of matches
            document.getElementsByClassName("expandable")[cardIndex].style.display = 'inline-block';
        } else {
            this.setState({expanded: false});
            document.getElementsByClassName("expandable")[cardIndex].style.display = 'none';
        }
    }


    render() {
        if (!this.props.stackCards) {
            return (
                <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif", padding: 12}}>
                    <CircularProgress size={80} thickness={6} />
                </div>
            );
        }
        let stackView;
        if(this.props.stackCards[0].isOwned) {
            const cardStackList = this.props.stackCards.map((item, index) => {
                return (

                        <div key={index} style={singleCard}>
                            <div className="cardHeader" onClick={() => {this.handleExpansion(index)}}>
                                {`Question: ${item.question}`}
                            </div>
                            <Divider style={cardDivider} />

                            <div className="expandable" style={{display:"none"}} onClick={() => {this.handleExpansion((index))}}>
                                <div style={answerText}>
                                    {`Answer: ${item.answer}`}
                                </div>
                            </div>
                            <div>
                                <EditCard cardID={this.props.stackCards[index]}/>
                                <DeleteCardConfirm cardID={this.props.stackCards[index]}/>
                            </div>
                        </div>
                )
            });
            // Bitten by a snake while struck by lightning on this part right here
            stackView=
                <div>
                    <div className="stackActions">
                    <RaisedButton className="studyButton" containerElement={<Link to={`/stackOverview/${this.props.stackCards[0].stack_id}/${this.props.stackCards[0].card_id}`} name="SingleCard"/>}>Study</RaisedButton>
                        <AddCard/>
                        <Chip className="chip" style={chip}><Avatar size={32}>{this.props.stackCards.length}</Avatar>Cards</Chip>
                    </div>
                    <div className="cardStackList">
                    {cardStackList}
                    </div>
                </div>
        }
        else if(this.props.stackCards){

            const cardStackList = this.props.stackCards.map((item, index) => {
                return (
                            <div key={index} style={singleCard}>
                                <div className="cardHeader">
                                    {`Question: ${item.question}`}
                                </div>
                                <Divider style={cardDivider} />
                                <div className="expandable" style={{display:"none"}} onClick={() => {this.handleExpansion((index))}}>
                                    <div style={answerText}>
                                        {`Answer: ${item.answer}`}
                                    </div>
                                </div>
                            </div>
                )
            });
            stackView =
                <div>
                    <div className="stackActions">
                        <ContentContentCopy className="contentCopy" style={{height:"3em", width:"3em", margin: "1em"}} onTouchTap={() => {this.handleCopy(this.props.stackCards[0])}}/>
                    {/*Was sent back an array of objects, so pull the length of the array to know how many cards are present*/}
                        <Chip className="chip" style={chip}><Avatar size={32}>{this.props.stackCards.length}</Avatar>Cards</Chip>
                    </div>
                    <div className="cardStackList">
                    {cardStackList}
                    </div>
                </div>
        }
        return (
            <div>
                <Paper className="stackHeader">
                    <span>{`Subject: ${this.props.stackCards[0].subject}`}</span>
                    <span>{`Category: ${this.props.stackCards[0].category}`}</span>
                    <span>{`Made by: ${this.props.stackCards[0].createdBy}`}</span>
                </Paper>
                {stackView}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards,
        newStackID: state.stack.newStackID
    }
}

export default connect(mapStateToProps, {getStackOverview, stackCopy})(StackViewStacks);