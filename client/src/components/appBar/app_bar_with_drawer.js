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
        const style = {
            textAlign: "center",
            margin: "1em auto"
        };
        const styles = {
            title: {
                cursor: 'pointer',
            },
            divider: {

            }
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
                    <MenuItem style={style} primaryText="About" onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/about" name="About"/>}/>
                    <Divider />
                    <MenuItem style={{position:"absolute", bottom: 0, marginLeft: "6.5em"}} primaryText="Logout" onClick={this.props.logout} onTouchTap={this.handleClose.bind(this)} containerElement={<NavLink to="/" name="Logout"/>}/>
                </Drawer>

                <AppBar
                    title={<span style={styles.title}>FlappCards</span>}
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