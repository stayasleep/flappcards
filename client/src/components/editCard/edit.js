import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import {cardEditor} from '../../actions/index';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

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
        const styles ={
            mediumIcon: {
                width: 48,
                height: 48
            },
            medium: {
                width: 96,
                height: 96,
                padding: 24
            }
        };
        return (
            <div>
                <IconButton iconStyle={styles.mediumIcon} style={styles.medium} label="Edit" tooltip="Edit Card" tooltipPosition="top-right" onTouchTap={this.handleOpen}>
                    <EditorModeEdit />
                </IconButton>
                <Dialog
                    title="Are you sure you want to edit this card?"
                    modal={true}
                    open={this.state.open}
                >

                    {/*On submit, use built in handleSubmit to pull off question and answer values from the form and pass them into handleEdit function*/}
                    <form onSubmit={handleSubmit((values) => {this.handleEdit(values)})} >
                        <div>
                            <Field name="question" component={this.renderInput} label="Question"/>
                        </div>
                        <div>
                            <Field name="answer" component={this.renderInput} label="Answer"/>
                        </div>
                        <RaisedButton label="Cancel" primary={true} onTouchTap={this.handleClose}/>
                        <RaisedButton label="Edit" primary={true} type="submit"/>
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
export default connect(mapStateToProps,{cardEditor})(EditCard);


