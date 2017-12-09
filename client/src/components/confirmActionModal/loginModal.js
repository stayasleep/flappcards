import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import RecoverPw from './recoverPW';
import '../styles/log_in.css';
import { resetAuthError } from '../../actions/index';
import Login from '../../containers/forms/login_form';

// styles.loginDialogContent = {} uses Material UI's default values
const styles = {
    center: {
        textAlign: "center",
    },
    button: {
        marginTop: 6,
        marginRight: 20
    },
    loginDialogBody: {

    },
    loginDialogContent: {},

    cancelBtn: {}
};

let usableBrowserHeight = window.innerHeight; // returns integer value (unit: pixels (px))

// this if statement is the/my inline js version of a media query that's compatible with Material UI
if (usableBrowserHeight < 600) {
    styles.loginDialogContent = {
        width: "100%",
        height: usableBrowserHeight,
        transform: "none"
    };
    styles.cancelBtn = {
        width: "90%"
    };
}


class LoginModal extends Component{
// export default class LoginModal extends Component {
    state = {
        loginModal: false,
    };

    handleOpen = () => {
        this.setState({loginModal: true});
    };

    handleClose = () => {
        //close login modal and reset (if) any authError notices back to null
        this.setState({loginModal: false});
        this.props.resetAuthError();
    };
    componentWillUnmount(){
        console.log('BYYYYYYYYYYYYYYYYYYYYYYYYE');
    }

    render() {
        return (
            <div className="loginModalOuterDiv">
                <RaisedButton style={styles.button} label="Login" labelColor="rgb(0, 121, 107)" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Login"
                    titleClassName="loginDialogTitle"
                    bodyClassName="loginDialogBody"
                    contentClassName="loginDialogContent"
                    overlayClassName="loginOverlay"


                    contentStyle={styles.loginDialogContent}
                    autoScrollBodyContent = {false}
                    modal={false}
                    open={this.state.loginModal}
                    style={styles.center}
                    onRequestClose={this.handleClose}
                    autoDetectWindowHeight={false}
                >
                    <Login/>
                    <FlatButton
                        className="cancelBtn"
                        label="Cancel"
                        primary={true}
                        fullWidth={false}
                        onTouchTap={this.handleClose}
                    />

                    <RecoverPw/>
                </Dialog>
            </div>
        );
    }
}
export default connect(null,{resetAuthError})(LoginModal);