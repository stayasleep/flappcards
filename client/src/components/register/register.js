import React,{Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import Registration from '../auth/registration';


class Register extends Component{

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
    }


    render(){
        return(
            <div>
                <Toolbar className="navHeader">
                    <ToolbarTitle text={<a  className="navTitleBar" href="https://flappcards.com">FlappCards</a>}/>
                    <ToolbarGroup>
                        <RaisedButton labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/home"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <Registration/>
            </div>
        )
    }
};
export default Register;