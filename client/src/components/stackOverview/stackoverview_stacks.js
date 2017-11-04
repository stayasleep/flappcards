import React from 'react';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';
import Divider from 'material-ui/Divider';
import EditMode from 'material-ui/svg-icons/editor/mode-edit';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import PopDialog from '../login/popUpDialog';
import AddCard from '../editCard/add';
import EditCard from '../editCard/edit';
import DeleteCardConfirm from '../confirmActionModal/deleteCard'

import {cardHeader, cardDivider, singleCard, cardText, questionText, stackOverviewCardActions, answerText, chip, mediumIcon, medium, header } from '../utilities/stackSummaryStyle';
import  './../styles/stackOverview.css' // import CSS for styling


const StackViewStacks = (props) => {
    console.log('stack view props', props);
    return (
        <div className="stackview-child">
            <Paper className="stackHeader">
                {!props.isOwned ?
                    (
                    <div>
                        <div>{`Subject: ${props.subject}`}</div>
                        <div>{`Category: ${props.category}`}</div>
                    </div>
                    ) : (
                    <div>owned</div>
                    )
                }
                <span>{`User: ${props.stackCards[0].createdBy}`}</span>
                {props.stackOrigin !== 0 &&
                    <div className="stack-origin">Source: <span className="origin-src" onClick={() => props.onOriginClick(props.stackOrigin)}>{props.stackOrigin}</span></div>
                }
            </Paper>

            <div className="stackview-stack">
                {/*If stack isnt yours and youre authorized*/}
                {!props.isOwned && props.auth2Copy &&
                <ContentContentCopy className="contentCopy" style={{cursor:"pointer",height:"3em", width:"3em", margin: "1em"}} onTouchTap={()=>props.onCopy(props.stackCards[0])} />
                }
                {/*If stack isnt yours and youre not logged in*/}
                {!props.isOwned && !props.auth2Copy &&
                <div className="copyDialogBox">
                    <ContentContentCopy className="contentCopy" style={{cursor:"pointer",height:"3em", width:"3em", margin: "1em"}} onTouchTap={()=>props.onCopyProhibited()} />
                    <PopDialog stateIs={props.popUpOpen} onClick={()=>props.onDialogClose()}/>
                </div>
                }
                <RaisedButton style={{fontWeight: "700"}} className="studyButton" containerElement={<Link to={`/stackoverview/${props.stackCards[0].stack_id}/${props.stackCards[0].card_id}`} name="SingleCard" />}>Study</RaisedButton>
                {props.isOwned &&
                <AddCard/>
                }
                <Chip className="chip" style={chip}><Avatar style={{boxShadow:"rgba(0, 0, 0, 0.75) 0px 1px 6px"}} size={32}>{props.stackCards.length}</Avatar>Cards</Chip>
                <div className="cardStackList">
                    {props.stackCards.map((item, index)=> {
                        return (
                            <div key={index} style={singleCard}>
                                <div className="cardHeader">
                                    <div onClick={()=>props.onCardToggle(index)} className="isDisplayed">+{!props.displayState[index].showAnswer ? "Answer" : "Question"}</div>
                                    {!props.displayState[index].showAnswer ? `Question: ${item.question}` : `Answer: ${item.answer}`}
                                </div>
                                <Divider style={cardDivider} />
                                {props.isOwned &&
                                <div className="stack-actions">
                                    <EditCard key={index} cardID={item.card_id} stackID={item.stack_id} formKey={index.toString()} initialValues={{editQ: item.question, editA: item.answer}}/>
                                    <DeleteCardConfirm cardID={item}/>
                                </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
};

export default StackViewStacks;