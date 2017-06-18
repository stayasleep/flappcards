import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Login from '../auth/log_in';
import RecoverPw from './recoverPW';

const styles = {
    center: {
        textAlign: "center",
    },
    button: {
        marginTop: 6,
        marginRight: 20
    },
    cancelBtn:{
       // color:"rgb(0, 121, 107)",
        boxShadow:"0 0 0 1pt rgb(0, 121, 107)",
    }
};

export default class LoginModal extends React.Component {
    state = {
        loginModal: false,
    };

    handleOpen = () => {
        this.setState({loginModal: true});
    };

    handleClose = () => {
        this.setState({loginModal: false});
    };

    render() {

        return (
            <div>
                <RaisedButton style={styles.button} label="Login" labelColor="rgb(0, 121, 107)" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Login"
                    autoScrollBodyContent = {true}
                    modal={true}
                    open={this.state.loginModal}
                    style={styles.center}
                >
                    <Login/>
                    <FlatButton
                        style={styles.cancelBtn}
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.handleClose}
                    />
                    <RecoverPw/>
                </Dialog>
            </div>
        );
    }
}