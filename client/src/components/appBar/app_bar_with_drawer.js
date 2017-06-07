import React, {Component} from 'react';
import { Drawer, AppBar, MenuItem} from 'material-ui';
import {logout} from '../../actions/index';
import NavLink from './header_nav_links';
import {connect} from 'react-redux'
import Divider from 'material-ui/Divider';
import {browserHistory} from 'react-router';

class FlashCardsAppBar extends Component {

    constructor(props){
        super(props);
        this.state = {open:false};
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }
    handleClose() { this.setState({open: false}); }
    render() {
        const titleStyleClass = {
            maxWidth: "20%",
            overflow: "visible"
        };
        function handleTouchTap() {
            browserHistory.push("/home")
        }
        return (
            <div className="appBar">
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem className="Navstyle" primaryText="Home" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/home" name="Home"/>}/>
                    <Divider />
                    <MenuItem className="Navstyle" primaryText="My Shelf" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/myShelf" name="My Shelf"/>}/>
                    <Divider />
                    <MenuItem className="Navstyle" primaryText="Create Cards" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/createCards" name="Create Cards"/>}/>
                    <Divider />
                    <MenuItem className="Navstyle" primaryText="Search" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/Search" name="Search"/>}/>
                    <Divider />
                    <MenuItem className="Navstyle" primaryText="Profile" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/profile" name="Profile"/>}/>
                    <Divider />
                    <MenuItem className="Navstyle" primaryText="About" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/about" name="About"/>}/>
                    <Divider />
                    <MenuItem className="Navstyle" primaryText="Logout" onClick={this.props.logout} onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/" name="Logout"/>}/>
                </Drawer>

                <AppBar
                    title={<span className="title">FlappCards</span>}
                    titleStyle = {titleStyleClass}
                    onTitleTouchTap={handleTouchTap}
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                />
            </div>
        );


    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.authenticated
    }
}

export default connect(mapStateToProps, {logout})(FlashCardsAppBar)