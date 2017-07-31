import React,{Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ResetForm from './reset_form';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {isRouteValid} from '../../actions/index';
// import ReactDom from 'react-dom';
// import renderInput from '../utilities/renderInputReg';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {green500} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import {subHeader} from '../utilities/stackSummaryStyle';
import {List} from 'material-ui/List';





const style={
    header: {
        backgroundColor: "teal",
        color: "white",
        fontFamily: "Roboto, sans-serif"
    },
    resetContainer:{
        margin:'2em',
    },
};


class Reset extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    state={ token:"" };

    componentWillMount(){
        const {p1,p2,p3}= this.props.location.query; //Pull from the url
        const token = `${p1}.${p2}.${p3}`;
        this.setState=({ token: token});
        console.log('reset comp will mount',this.props);
        this.props.isRouteValid(token);
        // document.body.style.backgroundColor = "#f0f0f0";
    }

    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }



    render(){
        console.log('reset comp render',this.props);
        //page loads, let it spin until axios is complete. then we can determine if link is dead or not
        if(this.props.isValid===null){
            return (
                <List>
                    <Subheader style={subHeader}>Reset Password</Subheader>
                    <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif"}}>
                        <CircularProgress size={80} thickness={6} />
                    </div>
                </List>
            )
        }
        //link is still good
        if(this.props.isValid) {
            return (
                <div>
                    <Toolbar style={style.header}>
                        <ToolbarTitle text="FlappCards"/>
                        <ToolbarGroup>
                            <RaisedButton backgroundColor="#f0f0f0" labelColor="rgb(0, 121, 107)" label="Home"
                                          containerElement={<Link to="/"/>}/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={style.resetContainer}>
                        <ResetForm token={this.props.location.query}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <Toolbar style={style.header}>
                        <ToolbarTitle text="FlappCards"/>
                        <ToolbarGroup>
                            <RaisedButton backgroundColor="#f0f0f0" labelColor="rgb(0, 121, 107)" label="Home"
                                          containerElement={<Link to="/"/>}/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={style.resetContainer}>
                        <h3>Link is no longer valid. Please start the reset process over again, thank you.</h3>
                    </div>
                </div>
            )
        }
    }
}
function mapStateToProps(state){
    return{
        isValid: state.reset.isValid,
        token: state.token,
    };
}
// export default connect(mapStateToProps,{isRouteValid, submitResetPw})(Reset);

// export default Reset;
export default connect(mapStateToProps,{isRouteValid})(Reset)