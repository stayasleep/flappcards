import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getUserData} from '../../actions/index'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

class Profile extends Component{
    componentWillMount(){
        this.props.getUserData();
    }
    render(){
        const profileImg = {
            height: "50vh",
            width: "50vw"
        };
        return (
            <div>
                <FlashCardsAppBar/>
                <div>
                    <AccountCircle style={profileImg}/>
                </div>
                <div>
                    Name: {this.props.name}
                </div>
                <div>
                    Username: {this.props.username}
                </div>
                <div>
                    Email: {this.props.email}
                </div>
                <div>
                    Birthday: {this.props.birthday}
                </div>
                <div>
                    Join Date: {this.props.joined}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.profile.userName,
        email: state.profile.email,
        birthday: state.profile.birthday,
        name: state.profile.name,
        joined: state.profile.joinDate
    }
}

export default connect(mapStateToProps, {getUserData})(Profile);