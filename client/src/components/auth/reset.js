import React,{Component} from 'react';
import {Link} from 'react-router';


class Reset extends Component{
    componentWillMount(){
        const {token} = this.props.params; //Pull from the url
        this.props.isRouteValid(token);
    }
    render(){
        return (
            <div>
                YO MAMA
            </div>
        )
    }
}



export default Reset;