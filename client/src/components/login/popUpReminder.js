import React,{Component} from 'react';
import { MenuItem } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'



//the popup a user will see if they try to perform an action that requires them to be logged in first
class PopUp extends Component{
      state={
        opens: false
    };

    handleAuth(){
        this.setState({opens:!this.state.opens});
        console.log('popup opened',this.props);
    }

    handleClose(){
        this.setState({opens: !this.state.opens});
    }

    render(){
        return(
            <div>
                <MenuItem style={this.props.style} primaryText={this.props.menuTitle} onTouchTap={this.handleAuth.bind(this)} />
                <Dialog
                    title="Please login or register to continue!"
                    titleClassName="popUpTitle"
                    bodyClassName="popUpBody"
                    contentClassName="popUpContent"
                    overlayClassName="popUpOverlay"
                    autoScrollBodyContent={false}
                    open={this.state.opens}
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
        )
    }
}

export default PopUp;