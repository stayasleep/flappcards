import React,{Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import Registration from '../auth/registration';


class Register extends Component{

    componentWillMount(){
        document.title="FlappCards - Sign Up Today!";
    }

    componentDidMount(){
        //Reg component floats right, but this page needs it differently so we modify the property for this case
        let div = document.getElementsByClassName("paperContainer")[0];
        div.style.float="";
        div.style.width="80%";
        div.style.margin="1em auto";
    }
    componentWillUnmount(){
        let div = document.getElementsByClassName("paperContainer")[0];
        div.style.float="";
        div.style.width="";
        div.style.margin="";
        //necessary or...
        document.title="FlappCards";
    }


    render(){
        return(
            <div>
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<Link className="navTitleBar" to="/">FlappCards</Link>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Registration/>
            </div>
        )
    }
}
export default Register;