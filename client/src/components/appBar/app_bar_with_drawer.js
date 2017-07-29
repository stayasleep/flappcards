import React, {Component} from 'react';
import { Drawer, AppBar, MenuItem} from 'material-ui';
import {logout} from '../../actions/index';
import NavLink from './header_nav_links';
import {connect} from 'react-redux'
import Divider from 'material-ui/Divider';
import {browserHistory} from 'react-router';
import {Navstyle} from './../styles/appBar.css';

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
        const style = {
            textAlign: "center",
            margin: "1em auto",
            display: "WebkitFlex",
            display: "flex",
            "flexFlow": "column",
            "WebkitFlexFlow": "column",
        };

        return (
            <div className="appBar">
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem style={style} primaryText="Home" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/home" name="Home"/>}/>
                    <Divider />
                    <MenuItem style={style} primaryText="My Shelf" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/myShelf" name="My Shelf"/>}/>
                    <Divider />
                    <MenuItem style={style} primaryText="Create Cards" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/createCards" name="Create Cards"/>}/>
                    <Divider />
                    <MenuItem style={style} primaryText="Search" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/Search" name="Search"/>}/>
                    <Divider />
                    <MenuItem style={style} primaryText="Profile" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/profile" name="Profile"/>}/>
                    <Divider />
                    {/*<MenuItem style={style} primaryText="About" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/about" name="About"/>}/>*/}
                    {/*<Divider />*/}
                    {this.props.authorized ? (
                            <MenuItem style={style} primaryText="Logout" onClick={this.props.logout} onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/" name="Logout"/>}/>
                        ) : (
                            <MenuItem style={style} primaryText="Logout" onClick={this.props.logout} onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/login" name="Log In"/>}/>

                        )
                    }
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
        auth: state.auth.authenticated,
        authorized: state.auth.authorized,
    }
}

export default connect(mapStateToProps, {logout})(FlashCardsAppBar)