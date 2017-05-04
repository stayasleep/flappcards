import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {deleteStack} from '../../actions/index';
import {Link} from 'react-router';
import {connect} from 'react-redux';

export default class Confirm extends React.Component {
    state = {
        open: false,
    };

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
                label="Yes"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Delete" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Are You Sure?"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }
}