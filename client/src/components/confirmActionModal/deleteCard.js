import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {deleteCard} from '../../actions/index';
import {connect} from 'react-redux';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';
import {deleteIconButton} from '../utilities/stackSummaryStyle';


const styler = {
    center: {
        textAlign: "center"
    }
};

class DeleteCardConfirm extends React.Component {
    state = {
        open: false,
    };

    handleDelete(card){
        // this.props.card.card_id; the ID of the to be deleted
        this.props.deleteCard({"stackID":card.stack_id, "cardID":card.card_id});
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Delete Card"
                primary={true}
                onTouchTap={this.handleClose}
                onClick={() => {this.handleDelete(this.props.cardID)}}
            />,
        ];

        return (
            <div>
                <ActionDelete style={deleteIconButton} label="Delete" hoverColor={red500} onTouchTap={this.handleOpen} />
                <Dialog
                    style={styler.center}
                    title="Are you sure you want to remove this card from the stack?"
                    actions={actions}
                    modal={true}
                    actionsContainerStyle={styler.center}
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }
}

export default connect(null, {deleteCard})(DeleteCardConfirm);