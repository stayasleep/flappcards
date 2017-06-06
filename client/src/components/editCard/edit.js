import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form';
import renderInput from '../utilities/renderInput';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import PropTypes from 'prop-types';
import {cardEditor, getStackOverview} from '../../actions/index';
import {blue500} from 'material-ui/styles/colors';
import {editIconButton} from '../utilities/stackSummaryStyle';

const styler = {
    center: {
        textAlign: "center"
    }
};

class EditCard extends Component {
    static contextTypes = {
        router: PropTypes.object
    };



    state = {
        open: false,
    };
    handleEdit(cardObject){
        // Pass in the cardObject which contains the necessary information for the edit
        // Pull the card_id (database) from this.props.cardID and assign key of cardID with value of card ID to the cardObject
        cardObject.cardID = this.props.cardID.card_id;
        this.props.cardEditor(cardObject);
        if(cardObject){
            this.setState({open: false});
            this.props.getStackOverview(this.props.cardID.stack_id);
        }
    }

    handleOpen = () => {
        // When the component opens, set the initial values of the form to what the question and answer were
        const {question, answer } = this.props.cardID; // pull off question and answer
        this.props.initialValues.question = question;
        this.props.initialValues.answer = answer;
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.props.reset(); // reset the form. "this" = EditCard form
        this.setState({open: false});
    };



    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <EditorModeEdit style={editIconButton} label="Edit"  hoverColor={blue500} onTouchTap={this.handleOpen} />
                <Dialog
                    style={styler.center}
                    title="Are you sure you want to edit this card?"
                    modal={true}
                    open={this.state.open}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                >

                    {/*On submit, use built in handleSubmit to pull off question and answer values from the form and pass them into handleEdit function*/}
                    <form onSubmit={handleSubmit((values) => {this.handleEdit(values)})} >
                        <div>
                            <Field name="question" component={renderInput} label="Question"/>
                        </div>
                        <div>
                            <Field name="answer" component={renderInput} label="Answer"/>
                        </div>
                        <div>
                            <p>Original question: {this.props.cardID.question}</p>
                            <p>Original answer: {this.props.cardID.answer}</p>
                        </div>
                        <RaisedButton label="Cancel" primary={true} onTouchTap={this.handleClose}/>
                        <RaisedButton label="Edit" primary={true} type="submit"/>
                    </form>
                </Dialog>
            </div>
        )
    }
}


// Form name = EditCard
// Apply the validation function
EditCard = reduxForm({
    form: 'EditCard',
    initialValues: {"question": '', "answer": ''},
    validate
})(EditCard);

function mapStateToProps(state) {
    return {
        stackCards: state.stack.stackCards

    }
}

// Connecting the edit card form values
export default connect(mapStateToProps,{cardEditor, getStackOverview})(EditCard);


