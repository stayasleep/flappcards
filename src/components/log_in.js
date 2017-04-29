import React, {Component} from 'react';
import {Link} from 'react-router'

class LogIn extends Component{
    render(){
        return(
            <div>
                <h1>Flash Cards</h1>
                    <i className="material-icons">account_circle</i>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="userName"/>
                        <label className="mdl-textfield__label">Username</label>
                    </div><br/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="password"/>
                        <label className="mdl-textfield__label">Password</label>
                    </div>

                    <Link to="/Home" name="Home"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Login</button></Link>
                    <Link to="/Registration" name="Registration"><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Register</button></Link>
            </div>
    )
    }
}

export default LogIn