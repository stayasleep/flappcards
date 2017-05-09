import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import {addSingleCard} from '../../actions/index';
import {Link} from 'react-router'

class AddCard extends Component {
    renderInput({input, label, type, meta: {touched, error}}){
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       type={type}
                       {...input}
            />
        )
    }

    state = {
        open: false,
    };

    handleAdd(cardObject){
        // Pass in the cardObject which contains the necessary information for the add
        // Pull the card_id (database) from this.props.cardID and assign key of cardID with value of card ID to the cardObject
        cardObject.stack_id = this.props.stackCards[0].stack_id;
        this.props.addSingleCard(cardObject);
        if(cardObject){
            this.setState({open: false})
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };



    render() {
        const { handleSubmit} = this.props;
        return (
            <div>
                <RaisedButton label="Add" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Are you sure you want to add a card to this stack?"
                    modal={true}
                    open={this.state.open}
                >

                    {/*On submit, use built in handleSubmit to pull off question and answer values from the form and pass them into handleAdd function*/}
                    <form onSubmit={handleSubmit((values) => {this.handleAdd(values)})} >
                        <div>
                            <Field name="question" component={this.renderInput} label="Question"/>
                        </div>
                        <div>
                            <Field name="answer" component={this.renderInput} label="Answer"/>
                        </div>
                        <RaisedButton label="Cancel" primary={true} onTouchTap={this.handleClose}/>
                        <RaisedButton label="Add Card" primary={true} type="submit"/>
                    </form>
                </Dialog>
            </div>
        )
    }
}

AddCard = reduxForm({
    form: 'AddCard',
    validate
})(AddCard);

function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards
    }
}

// Connecting the add card form values
export default connect(mapStateToProps,{addSingleCard})(AddCard);
