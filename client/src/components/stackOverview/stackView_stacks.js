import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import renderInput from '../utilities/renderInputStackOV';
import {Link} from 'react-router'
import { editStackHeaders, getStackOverview, stackCopy} from '../../actions/index'
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
import EditMode from 'material-ui/svg-icons/editor/mode-edit';
import PopDialog from '../login/popUpDialog';


class StackViewStacks extends Component{
    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        expanded: false,
        opens: false,
        enableEditSubj: false,
        enableEditCat: false,
        editModeSubj: false,
        editModeCat: false,

    };
    //determines copy icons rendering depending on if user is logged in or not
    renderCopy() {
       return (this.props.authCopy ? (
                <ContentContentCopy className="contentCopy" style={{cursor:"pointer",height:"3em", width:"3em", margin: "1em"}} onTouchTap={() => {this.handleCopy(this.props.stackCards[0])}}/>
            )://this div below really makes the CSS look weird for the studyButton, patched in the stackOv.css
               (
                <div className="copyDialogBox">
                    <ContentContentCopy className="contentCopy" style={{cursor:"pointer",height:"3em", width:"3em", margin: "1em"}} onTouchTap={()=>{this.handleNoCopy.bind(this)()}}/>
                    <PopDialog stateIs={this.state.opens} onClick={()=>this.handleClose.bind(this)()} />
                </div>
            )
       )
    }

    renderSubjectCategory(){
        if(this.props.stackCards[0].isOwned){
            return (!this.state.enableEditSubj ? (
                    <div onMouseEnter={this.mouseEnterSubj.bind(this)} onMouseLeave={this.mouseLeaveSubj.bind(this)} onClick={this.handleEditSubj.bind(this)}>{`Subject: ${this.props.stackSubj}`}<EditMode style={{display: displayEditSubj}}/> </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit((values) => {this.handleFormSubject(values)})}>
                            <Field className="editSubj" name="subject" component={renderInput} />
                            <RaisedButton primary={true} type="submit" label="Submit" />
                            <RaisedButton type="button" onClick={(str) => this.handleEditCancel.bind(this)("subject")} label="Cancel" />
                        </form>
                    </div>
                )

            )
        }else{
            return(
                <div>{`Subject: ${this.props.stackSubj}`}</div>
            )
        }
    }
    //occurs when the unauthorized copy icon is clicked, allowing the dialog to open
    handleNoCopy(){
        this.setState({opens:!this.state.opens});

    }
    //passed down to the dialog so that it can close when clicking outside the component
    handleClose(){
        this.setState({opens:!this.state.opens});
    }
    //authorized users can copy stacks via axios call;
    handleCopy(copy){
        this.props.stackCopy(copy);
    };

    handleExpansion(cardIndex) {
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
    mouseEnterSubj(){
        console.log('sub mouse');
        this.setState({editModeSubj: true});
    }
    mouseLeaveSubj(){
        console.log('sub mouse leave');
        this.setState({editModeSubj: false});
    }
    mouseEnterCat(){
        this.setState({editModeCat: true});
    }
    mouseLeaveCat(){
        this.setState({editModeCat: false});

    }
    //click to switch to redux form and edit stack subject
    handleEditSubj(){
        console.log('click on div',this.props);
        this.setState({enableEditSubj: !this.state.enableEditSubj});
    }
    //click to switch to redux form and edit stack category
    handleEditCat(){
        this.setState({enableEditCat: !this.state.enableEditCat});
    }
    //one form, two functions, but they both will send subj and category as an object
    //that way the user doesnt have to modify both at the same time, can be one or the other
    handleFormSubject(values){
        let headers = {...values, stackID: this.props.stackCards[0].stack_id};
        this.props.editStackHeaders(headers);
        //axios goes here
        this.setState({enableEditSubj: !this.state.enableEditSubj});
    }
    handleFormCategory(vals){
        let headers = {...vals, stackID: this.props.stackCards[0].stack_id};
        this.props.editStackHeaders(headers);
        //axios goes here
        this.setState({enableEditCat: !this.state.enableEditCat});
    }
    //reusability for either subject or category title cancellation
    handleEditCancel(str){
        if (str === "subject"){
            this.setState({enableEditSubj: !this.state.enableEditSubj});
            this.props.reset("stackHeaders");
        } else {
            console.log('not tru', str);
            this.setState({enableEditCat: !this.state.enableEditCat});
            this.props.reset("stackHeaders");
        }
    }

    render() {
        console.log("bottu");
        const { handleSubmit } = this.props;
        let displayEditSubj = "none";
        let displayEditCat = "none";

        if(this.state.editModeSubj){
            displayEditSubj = "inline-block";
        } else if(this.state.editModeCat){
            displayEditCat = "inline-block";
        }

        if(this.props.stackCards){
            this.props.initialValues.subject = this.props.stackSubj;
            this.props.initialValues.category = this.props.stackCat;
        }

        if (!this.props.stackCards) {
            return (
                <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif", padding: 12}}>
                    <CircularProgress size={80} thickness={6} />
                </div>
            );
        }

        let stackView;
        let subjMode;
        let catMode;

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
                    <RaisedButton style={{fontWeight:"700"}} className="studyButton" containerElement={<Link to={`/stackOverview/${this.props.stackCards[0].stack_id}/${this.props.stackCards[0].card_id}`} name="SingleCard"/>}>Study</RaisedButton>
                        <AddCard/>
                        <Chip className="chip" style={chip}><Avatar style={{boxShadow:"rgba(0, 0, 0, 0.75) 0px 1px 6px"}} size={32}>{this.props.stackCards.length}</Avatar>Cards</Chip>
                    </div>
                    <div className="cardStackList">
                    {cardStackList}
                    </div>
                </div>

            subjMode =
                !this.state.enableEditSubj ? (
                    <div onMouseEnter={this.mouseEnterSubj.bind(this)} onMouseLeave={this.mouseLeaveSubj.bind(this)} onClick={this.handleEditSubj.bind(this)}>{`Subject: ${this.props.stackSubj}`}<EditMode style={{display: displayEditSubj}}/> </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit((values) => {this.handleFormSubject(values)})}>
                            <Field className="editSubj" name="subject" component={renderInput} />
                            <RaisedButton primary={true} type="submit" label="Submit" />
                            <RaisedButton type="button" onClick={(str) => this.handleEditCancel.bind(this)("subject")} label="Cancel" />
                        </form>
                    </div>
                );

            catMode =
                !this.state.enableEditCat ? (
                        <div onMouseEnter={this.mouseEnterCat.bind(this)} onMouseLeave={this.mouseLeaveCat.bind(this)} onClick={this.handleEditCat.bind(this)}>{`Category: ${this.props.stackCat}`}<EditMode style={{display: displayEditCat}} /></div>
                    ) : (
                        <div>
                            <form onSubmit={handleSubmit((vals) => {this.handleFormCategory(vals)})} >
                                <Field className="editCat" name="category" component={renderInput} />
                                <RaisedButton primary={true} type="submit" label="Submit" />
                                <RaisedButton type="button" onClick={(str)=>this.handleEditCancel.bind(this)("category")} label="Cancel"/>
                            </form>
                        </div>
                    )
        }
        //if the stack being observed doesnt belong to you..
        else if(this.props.stackCards){
            //added handleExp back onto the className=cardHeader so now you can browse other pplz answers before you copy the stack eh?
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
                        </div>
                )
            });
            stackView =
                <div>
                    <div className="stackActionsGuest">
                        {this.renderCopy()}
                        <RaisedButton style={{fontWeight:"700"}} className="studyButton" containerElement={<Link to={`/stackOverview/${this.props.stackCards[0].stack_id}/${this.props.stackCards[0].card_id}`} name="SingleCard"/>}>Study</RaisedButton>
                        {/*Was sent back an array of objects, so pull the length of the array to know how many cards are present*/}
                        <Chip className="chip" style={chip}><Avatar size={32}>{this.props.stackCards.length}</Avatar>Cards</Chip>
                    </div>
                    <div className="cardStackList">
                    {cardStackList}
                    </div>
                </div>

            subjMode = <div>{`Subject: ${this.props.stackSubj}`}</div>;
            catMode = <div>{`Category: ${this.props.stackCat}`}</div>;
        }
        return (
            <div>
                <Paper className="stackHeader">
                    { subjMode }
                    { catMode }
                    <span>{`Made by: ${this.props.stackCards[0].createdBy}`}</span>
                </Paper>
                {stackView}
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    if(!values.subject){
        errors.subject = "Subject is required";
    }else if(values.subject.length > 40){
        errors.subject ="Subject must be shorter than 40 characters";
    }

    if(!values.category){
        errors.category= "Category is required";
    } else if(values.category.length > 40){
        errors.category = "Category must be shorter than 40 characters";
    }

    return errors;
}

StackViewStacks = reduxForm({
    form: 'stackHeaders',
    initialValues: {"subject":"", "category": ""},
    enableReinitialize: true,
    overwriteOnInitialValuesChange: false,
    validate
})(StackViewStacks);

function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards,
        newStackID: state.stack.newStackID,
        stackSubj: state.stack.subj,
        stackCat: state.stack.course,
    }
}

export default connect(mapStateToProps, {editStackHeaders, getStackOverview, stackCopy})(StackViewStacks);