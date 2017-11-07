import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ForgotForm from '../../containers/forms/forgot_form';
import { resetAuthRecovery } from '../../actions/index';

const styles = {
    center: {
        textAlign: "center",
    },
    button: {
        color: "teal"
    },
    cancelBtn:{
        color:"rgb(0, 121, 107)",
        boxShadow:"0 0 0 1pt rgb(0, 121, 107)",
    },
    margin: {
      margin: "1em"
    }
};

class RecoverPw extends React.Component{
    state = {
        //loginModal: true,
        recoveryModal: false,
    };

    componentWillReceiveProps(nextProps){
        console.log('recoverPW dialog this prop',this.props);
        console.log('recoverPW receiving props',nextProps);
        if(nextProps.recoverPW !== this.props.recoverPW) {
            if (nextProps.recoverPW) {

                // this.interval = setInterval(() => this.sendMeHome(), 1000);
            }
        }
    }
    componentWillUnmount(){
        console.log('recoverPW unmount');
        clearInterval(this.interval);
        if(this.props.recoverPW){
            // this.props.resetAuthRecovery();

        }
    }
    //this works when we are on the landing page
    // sendMeHome(){
    //     if(this.state.time === 0){
    //         setTimeout(() => {
    //             browserHistory.push("/login");
    //             // this.setState({recoveryModal: false});
    //         },500);
    //         console.log('batman');
    //         this.setState({recoveryModal: false});
    //         clearInterval(this.interval);
    //         this.props.resetAuthRecovery();
    //     }else{
    //         this.setState({time: this.state.time - 1});
    //     }
    // }


    handleOpen = (e) =>{
        e.preventDefault();
        this.setState({
            recoveryModal:true
        });
    };
    handleClose = () =>{
        //close the recovery form and reset recovery error
        this.setState({
            recoveryModal: false
        });
        console.log('happens first')
        this.props.resetAuthRecovery();
    };

    render(){
        console.log('render for recoverPW dialog',this.props);

        return(
            <div style={styles.margin}>
                <a style = {styles.button} href="" onClick={this.handleOpen}>Forgot Password?</a>
                <Dialog
                    title="Reset Password"
                    autoScrollBodyContent={true}
                    modal={true}
                    open={this.state.recoveryModal}
                    style={styles.center}
                >
                    <h3>Please enter the requested information.</h3>
                    <h4>After submission, an email will be sent to the specified email address.</h4>

                    <ForgotForm/>
                    <FlatButton
                        style={styles.cancelBtn}
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.handleClose}
                        disabled={this.props.recoverPW}
                    />
                </Dialog>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        recoverPW: state.auth.recoverPW,
    }
}
export default connect(mapStateToProps,{ resetAuthRecovery })(RecoverPw);