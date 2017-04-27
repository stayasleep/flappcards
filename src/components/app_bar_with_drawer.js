import React, {Component} from '../../node_modules/react';
import { Drawer, AppBar, MenuItem} from '../../node_modules/material-ui'

import NavLink from './header_nav_links'

export default class FlashCardsAppBar extends Component {

    constructor(props){
        super(props);
        this.state = {open:false};
    }


    handleToggle() {
        this.setState({open: !this.state.open});
    }
    handleClose() { this.setState({open: false}); }
    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem onTouchTap={this.handleClose.bind(this)}><NavLink to="/" name="Home"/></MenuItem>
                    <MenuItem onTouchTap={this.handleClose.bind(this)}><NavLink to="/profile" name="Profile"/></MenuItem>
                    <MenuItem onTouchTap={this.handleClose.bind(this)}><NavLink to="/myShelf" name="My Shelf"/></MenuItem>
                    <MenuItem onTouchTap={this.handleClose.bind(this)}><NavLink to="/Search" name="Search"/></MenuItem>
                    <MenuItem onTouchTap={this.handleClose.bind(this)}><NavLink to="/createCards" name="Create Cards"/></MenuItem>
                </Drawer>

                <AppBar
                    title="Flash Cards"
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                />
            </div>
        );
    }
}
