import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ForgotPw from '../auth/forgot_pw';

const styles = {
    center: {
        textAlign: "center",
    },
    button: {
        marginTop: 6,
        marginRight: 20
    },
    cancelBtn:{
        color:"rgb(0, 121, 107)",
        boxShadow:"0 0 0 1pt rgb(0, 121, 107)",
    }
};

export default class RecoverPw extends React.Component{
    state = {
        loginModal: true,
        recoveryModal: false
    };

    handleOpen = () =>{
        this.setState({
            recoveryModal:true
        });
    };
    handleClose = () =>{
        this.setState({
            recoveryModal: false
        });
    };

    render(){

        return(
            <div>
                <RaisedButton style = {styles.button} label="Forgot Password?" onTouchTap={this.handleOpen}
                />
                <Dialog
                    title="Reset Password"
                    autoScrollBodyContent={true}
                    modal={true}
                    open={this.state.recoveryModal}
                    style={styles.center}
                >
                    <h3>Please enter the requested information.  After submission, an email will be sent to the specified email address.</h3>
                    <ForgotPw/>
                    <FlatButton
                        style={styles.cancelBtn}
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.handleClose}
                    />
                </Dialog>
            </div>
        )
    }
}
