import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import {cardEditor, getStackOverview} from '../../actions/index';

class EditCard extends Component {
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

    handleEdit(cardObject){
        // Pass in the cardObject which contains the necessary information for the edit
        // Pull the card_id (database) from this.props.cardID and assign key of cardID with value of card ID to the cardObject
        cardObject.cardID = this.props.cardID.card_id;
        this.props.cardEditor(cardObject);
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
                <RaisedButton label="Edit" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Are You Sure?"
                    modal={true}
                    open={this.state.open}
                >

                    {/*On submit, use built in handleSubmit to pull off question and answer values from the form and pass them into handleEdit function*/}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field name="question" component={this.renderInput} label="Question"/>
                        </div>
                        <div>
                            <Field name="answer" component={this.renderInput} label="Answer"/>
                        </div>
                        <RaisedButton label="Cancel" primary={true} onTouchTap={this.handleClose}/>
                        <RaisedButton label="Yes" primary={true} type="submit" onTouchTap={this.handleClose} />
                    </form>
                </Dialog>
            </div>
        )
    }
}

EditCard = reduxForm({
    form: 'EditCard',
    validate
})(EditCard);

function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards
    }
}

// Connecting the edit card form values
export default connect(mapStateToProps,{cardEditor, getStackOverview})(EditCard);


