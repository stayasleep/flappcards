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
import IconButton from 'material-ui/IconButton';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';
import Divider from 'material-ui/Divider';
import {cardDisplay, cardHeader, cardDivider, cardToAdd as singleCard, cardText, questionText, stackOverviewCardActions, answerText, chip, mediumIcon, medium, header } from '../utilities/stackSummaryStyle';

import {blue500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
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

    handleExpansion(isExpanded) {
        console.log("handleExpansion called");
        // if !(F) => if T
        if (!this.state)
        this.setState({expanded: true});

    }


    render() {
        if (!this.props.stackCards) {
            return <div>Loading...</div>
        }
        let stackView;
        if(this.props.stackCards[0].isOwned) {
            const cardStackList = this.props.stackCards.map((item, index) => {
                return (

                        <div style={singleCard}>
                        <Paper key={index} style={cardDisplay}>
                            <div style={cardHeader} onClick={() => {this.handleExpansion()}}>
                                {`Question: ${item.question}`}
                            </div>
                            <Divider style={cardDivider} />
                            <div style={answerText}>
                                {`Answer: ${item.answer}`}
                            </div>
                            <div style={{display: "-webkit-inline-flex", float: "right"}}>
                                <EditCard cardID={this.props.stackCards[index]}/>
                                <DeleteCardConfirm cardID={this.props.stackCards[index]}/>
                            </div>
                        </Paper>
                        </div>
                )
            });
            // Bitten by a snake while struck by lightning on this part right here
            stackView=
                <div>
                    <RaisedButton containerElement={<Link to={`/stackOverview/${this.props.stackCards[0].stack_id}/${this.props.stackCards[0].card_id}`} name="SingleCard"/>}>Study</RaisedButton>
                    <div>
                        <AddCard/>
                        <Chip style={chip}><Avatar size={32}>{this.props.stackCards.length}</Avatar>Number Of Cards</Chip>
                    </div>
                    {cardStackList}
                </div>
        }
        else if(this.props.stackCards){

            const cardStackList = this.props.stackCards.map((item, index) => {
                return (
                        <div style={singleCard}>
                            <Paper key={index} style={cardDisplay}>
                                <div style={cardHeader}>
                                    {`Question: ${item.question}`}]
                                </div>
                                <Divider style={cardDivider} />
                                <div style={answerText}>
                                    {`Answer: ${item.answer}`}
                                </div>
                            </Paper>
                        </div>

                )
            });
            stackView =
                <div>
                    <IconButton iconStyle={mediumIcon} style={medium} label="Copy" tooltip="Copy Stack" tooltipPosition="top-center" onTouchTap={() => {this.handleCopy(this.props.stackCards[0])}}>
                            <ContentContentCopy/>
                        </IconButton>
                        <div>
                            {/*Was sent back an array of objects, so pull the length of the array to know how many cards are present*/}
                            <Chip style={chip}><Avatar>{this.props.stackCards.length}</Avatar>Number of Cards</Chip>
                        </div>
                    {cardStackList}
                </div>
        }
        return (
            <div>
                <div style={header}>
                <div>
                    <span>{`Subject: ${this.props.stackCards[0].subject}`}</span>
                </div>
                <div>
                    <span>{`Category: ${this.props.stackCards[0].category}`}</span>
                </div>
                <div>
                    <span>{`Made by: ${this.props.stackCards[0].createdBy}`}</span>
                </div>
                </div>
                <div style={{border: "black 2px solid"}}>
                {stackView}
                </div>
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