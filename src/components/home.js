import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';
import Recent from './recent_stacks'
import Community from './community_stacks'

class Home extends Component {
    render(){
        console.log('hello')
        return(
            <div>
                <FlashCardsAppBar/>
                <div className="mdl-grid">
                    <ul className="demo-list-three mdl-list mdl-cell mdl-cell--center">
                        <Recent/>
                    </ul>
                </div>
                <div>Here is Some Aggregated Content To Get Your Attention</div>
                <div className="mdl-grid">
                    <ul className="demo-list-three mdl-list mdl-cell mdl-cell--center">
                        <Community/>
                    </ul>
                </div>
                <div className="mdl-grid">
                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-cell--10-offset mdl-cell--middle">
                        <i className="material-icons">create</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Home