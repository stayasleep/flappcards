import React, {Component} from 'react';

class LogIn extends Component{
    render(){
        return(
            <div>
                <h1>Flash Cards</h1>
                    <i className="material-icons">account_circle</i>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="userName"/>
                    <label className="mdl-textfield__label" for="userName">Username</label>
                    </div><br/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="password"/>
                    <label className="mdl-textfield__label" for="password">Password</label>
                    </div>

                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Login</button>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Register</button>
            </div>
    )
    }
}

export default LogIn