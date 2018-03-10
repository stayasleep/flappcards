import React, {Component} from 'react'
import { Field, reduxForm, reset } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
// import validate from './validate';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import renderInput from '../utilities/renderInput';
import {addSingleCard} from '../../actions/index';
import {singleCardForm, singleCardAdd, singleCardAddDialog} from './../styles/add_single_card.css';

const styler = {
    center: {
        textAlign: "center"
    },
    clearBtn:{
        boxShadow: "0 0 0 1pt rgb(0, 121, 107)",
    }
};


class AddCard extends Component {
    state = {
        open: false,
    };

    handleAdd(cardObject){
        if(Object.keys(cardObject).length === 0) return; //really need to fix this blank reduxForm submissions
        // Pull the card_id (database) from this.props.cardID and assign key of cardID with value of card ID to the cardObject
        cardObject.stack_id = this.props.stackCards[0].stack_id;
        this.props.addSingleCard(cardObject);
        this.props.dispatch(reset('AddCard')); //clears the form
        this.setState({open: false});
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.props.reset('AddCard');
        this.setState({open: false});
    };

    render() {
        const { handleSubmit} = this.props;
        return (
            <div className="singleCardAdd">
                <RaisedButton className="stackActionsAdd" primary={true} label="Add" onTouchTap={this.handleOpen} />
                <Dialog
                    style={styler.center}
                    className="singleCardAddDialog"
                    title="Are you sure you want to add a card to this stack?"
                    modal={false}
                    open={this.state.open}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    bodyClassName="dialogBody"
                    onRequestClose={()=> this.handleClose()}
                >

                    {/*On submit, use built in handleSubmit to pull off question and answer values from the form and pass them into handleAdd function*/}
                    <form className="singleCardForm" onSubmit={handleSubmit((values) => {this.handleAdd(values)})} >
                            <Field name="question" component={renderInput} label="Question"/>
                            <Field name="answer" component={renderInput} label="Answer"/>
                        <div className="addCardConfirmationButtons">
                            <RaisedButton label="Add Card" primary={true} type="submit"/>
                            <RaisedButton label="Cancel" style={styler.clearBtn} labelColor="rgb(0, 121, 107)" onTouchTap={this.handleClose}/>
                        </div>
                    </form>
                </Dialog>
            </div>
        )
    }
}
function validate(values){
    const errors = {};
    if(!values.question){
        errors.question = "Required";
    }
    if(!values.answer){
        errors.answer = "Required";
    }
    if(values.question && /^\s+$/.test(values.question)){
        errors.question = "Question must have a value";
    }
    if(values.answer && /^\s+$/.test(values.answer)){
        errors.answer = "Answer must have a value";
    }
    if(values.question && values.question.length > 400){
        errors.question = "Question must be fewer than 400 characters";
    }
    if(values.answer && values.answer.length > 400){
        errors.answer = "Answer must be fewer than 400 characters";
    }

    return errors;

}

AddCard = reduxForm({
    form: 'AddCard',
    validate,
})(AddCard);

function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards
    }
}

// Connecting the add card form values
export default connect(mapStateToProps,{addSingleCard})(AddCard);
