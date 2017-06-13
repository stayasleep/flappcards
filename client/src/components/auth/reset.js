import React,{Component} from 'react';
import {Link} from 'react-router';
import {isRouteValid} from '../../actions/index';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';


const style={
    header: {
        backgroundColor: "teal",
        color: "white",
        fontFamily: "Roboto, sans-serif"
    }
};


class Reset extends Component{
    componentWillMount(){
        const {token} = this.props.params; //Pull from the url
        this.props.isRouteValid(token);
    }
    render(){
        return (
            <div>
                <Toolbar style={style.header}>
                    <ToolbarTitle text="FlappCards"/>
                    <ToolbarGroup>
                        <RaisedButton label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
}



// export default Reset;
export default connect(null,{isRouteValid})(Reset)