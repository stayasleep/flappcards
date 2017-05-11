import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Login from '../auth/log_in';

const styles = {
    center: {
        textAlign: "center"
    }
};

export default class LoginModal extends React.Component {
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
                label="Delete"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Login" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Login"
                    modal={true}
                    open={this.state.open}
                    style={styles.center}
                >
                    <Login/>
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.handleClose}
                    />
                </Dialog>
            </div>
        );
    }
}