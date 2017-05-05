import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import {Link} from 'react-router'

class Profile extends Component{
    componentWillMount(){
        this.props;
    }

    render(){
        return (
            <div>
                <FlashCardsAppBar/>
                <div>
                    {this.props.username}
                </div>
                <div>
                    {this.props.email}
                </div>
                <div>
                    {this.props.birthday}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state,
        email: state,
        birthday: state
    }
}

export default Profile