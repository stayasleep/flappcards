import React, {Component} from 'react';
import { Drawer, AppBar, MenuItem} from 'material-ui'


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

                    <MenuItem onTouchTap={this.handleClose.bind(this)}>Home</MenuItem>
                    <MenuItem onTouchTap={this.handleClose.bind(this)}>Profile</MenuItem>
                    <MenuItem onTouchTap={this.handleClose.bind(this)}>My Shelf</MenuItem>
                    <MenuItem onTouchTap={this.handleClose.bind(this)}>Search</MenuItem>
                    <MenuItem onTouchTap={this.handleClose.bind(this)}>Logout</MenuItem>
                </Drawer>

                <AppBar
                    title="Flash Cards"
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                />
            </div>
        );
    }
}
