import React, {Component} from '../../../../node_modules/react';
import { Drawer, AppBar, MenuItem} from '../../../../node_modules/material-ui'
import {logout} from '../../actions/index';
import NavLink from './header_nav_links';
import {connect} from 'react-redux'

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
        const style = {
            textAlign: "center"
        };

        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem style={style} primaryText="Home" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/home" name="Home"/>}/>
                    <MenuItem style={style} primaryText="Profile" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/profile" name="Profile"/>}/>
                    <MenuItem style={style} primaryText="My Shelf" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/myShelf" name="My Shelf"/>}/>
                    <MenuItem style={style} primaryText="Search" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/Search" name="Search"/>}/>
                    <MenuItem style={style} primaryText="Create Cards" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/createCards" name="Create Cards"/>}/>
                    <MenuItem style={style} primaryText="Logout" onClick={this.props.logout} onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/" name="Logout"/>}/>
                </Drawer>

                <AppBar
                    title="Flash Cards"
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