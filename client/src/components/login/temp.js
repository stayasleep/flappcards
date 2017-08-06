import React,{Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'



//the popup a user will see if they try to perform an action that requires them to be logged in first
export default class PopUpD extends React.Component{


    handleClose(){
        // this.setState({opens: false});
        console.log('tryna close');
        this.props.onClick();
    };

    // handleOpen() {
    //     this.props.onClick(true);
    // }


    render(){
        console.log('temp dialoog');
        return(
            <div>
                <Dialog
                    ref="dialog"
                    title="Please login or register to continue!"
                    titleClassName="popUpTitle"
                    bodyClassName="popUpBody"
                    contentClassName="popUpContent"
                    overlayClassName="popUpOverlay"
                    autoScrollBodyContent={false}
                    open={this.props.stateIs}
                    modal={false}
                    onRequestClose={this.handleClose.bind(this)}
                >
                    <div className="popUpBtnContainer">
                        <RaisedButton label="Login" primary={true} containerElement={<Link to={`/login`} name="login"/>} />
                        <br/>
                        <RaisedButton label="Register" style={{"boxShadow":"0 0 0 1pt rgb(0,121,107)"}} labelColor="rgb(0, 121, 107)" containerElement={<Link to={`/register`} name="register"/>} />
                    </div>
                </Dialog>
            </div>
        );
    }
};

