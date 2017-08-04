import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import renderInput from '../utilities/renderInput';
import {addSingleCard, getStackOverview} from '../../actions/index';
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
        console.log('before axios handleadd',this.props);
        // Pass in the cardObject which contains the necessary information for the add
        // Pull the card_id (database) from this.props.cardID and assign key of cardID with value of card ID to the cardObject
        cardObject.stack_id = this.props.stackCards[0].stack_id;
        this.props.addSingleCard(cardObject);
        this.setState({open: false});
        // if(cardObject){
        //     console.log('inside handleAdd cardOb',cardObject);
        //     this.setState({open: false});
        //     this.props.getStackOverview(cardObject.stack_id);
        // }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };



    render() {
        console.log('render add card');
        const { handleSubmit} = this.props;
        return (
            <div className="singleCardAdd">
                <RaisedButton className="stackActionsAdd" primary={true} label="Add" onTouchTap={this.handleOpen} />
                <Dialog
                    style={styler.center}
                    className="singleCardAddDialog"
                    title="Are you sure you want to add a card to this stack?"
                    modal={true}
                    open={this.state.open}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    bodyClassName="dialogBody"
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
export default connect(mapStateToProps,{addSingleCard, getStackOverview})(AddCard);
