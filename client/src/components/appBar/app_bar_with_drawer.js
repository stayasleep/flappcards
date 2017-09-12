import React, {Component} from 'react';
import {connect} from 'react-redux'
import { browserHistory, Link } from 'react-router';
import { Drawer, AppBar, MenuItem} from 'material-ui';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import NavLink from './header_nav_links';
import LoginModal from '../confirmActionModal/loginModal';
import PopUp from '../login/popUpReminder';
import {Navstyle} from './../styles/appBar.css';
import {logout} from '../../actions/index';


class FlashCardsAppBar extends Component {

    constructor(props){
        super(props);
        this.state = {open:false};
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }
    handleClose() {
        this.setState({open: false});
    }

    render() {
        const titleStyleClass = {
            maxWidth: "20%",
            overflow: "visible"
        };
        function handleTouchTap() {
            browserHistory.push("/home")
        }
        const style = {
            textAlign: "center",
            margin: "1em auto",
            display: "WebkitFlex",
            display: "flex",
            "flexFlow": "column",
            "WebkitFlexFlow": "column",
        };

        const rightButtons = (
            this.props.authorized ? (
                <div className="loginModalContainerDiv" style={{marginTop:"8px"}}>
                    <RaisedButton
                        label="Log Out"
                        labelColor="rgb(0, 121, 107)"
                        onTouchTap={() => this.props.logout()}
                        containerElement={<Link to="/logout"/>}
                    />
                </div>
                ) : (
                    <div className="loginModalContainerDiv">
                        <LoginModal/>
                    </div>
                )
        );

        return (
            <div className="appBar">
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem style={style} primaryText="Home" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/home" name="Home"/>}/>
                    <Divider />
                    {this.props.authorized ? (
                        <div>
                            <MenuItem style={style} primaryText="My Shelf" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/myShelf" name="My Shelf"/>}/>
                            <Divider />
                            <MenuItem style={style} primaryText="Create Cards" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/createCards" name="Create Cards"/>}/>
                        </div>
                        ) : (
                        <div>
                            <PopUp style={style} menuTitle="My Shelf" onTouchTap={this.handleClose.bind(this)}/>
                            <Divider />
                            <PopUp style={style} menuTitle="Create Cards" onTouchTap={this.handleClose.bind(this)}/>
                        </div>
                        )
                    }
                    <Divider />
                    <MenuItem style={style} primaryText="Search" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/Search" name="Search"/>}/>
                    <Divider />
                    {this.props.authorized ? (
                        <div>
                            <MenuItem style={style} primaryText="Profile" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/profile" name="Profile"/>}/>
                            <Divider />
                            <MenuItem style={style} primaryText="Logout" onClick={this.props.logout} onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/logout" name="Logout"/>}/>
                        </div>
                        ) : (
                        <div>
                            <PopUp style={style} menuTitle="Profile" onTouchTap={this.handleClose.bind(this)} />
                            <Divider />
                            <MenuItem style={style} primaryText="Log In" onClick={this.props.logout} onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/login" name="Log In"/>}/>
                        </div>
                        )
                    }
                </Drawer>
                <AppBar
                    title={<span className="title">FlappCards</span>}
                    titleStyle = {titleStyleClass}
                    iconElementRight={rightButtons}
                    onTitleTouchTap={handleTouchTap}
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                />
            </div>
        );


    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.authenticated,
        authorized: state.auth.authorized,
    }
}

export default connect(mapStateToProps, {logout})(FlashCardsAppBar)