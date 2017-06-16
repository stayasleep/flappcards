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
        console.log('reset comp', this.props);
        // debugger;
        const {p1,p2,p3}= this.props.location.query; //Pull from the url
        console.log('token get ',[p1,p2,p3]);
        const token = `${p1}.${p2}.${p3}`;
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