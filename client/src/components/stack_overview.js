import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';
import StackViewStacks from './stackView_stacks'

class Stacks extends Component {
    render(){
        return(
            <div>
                <FlashCardsAppBar/>
                <div className="mdl-layout__content">
                    <div className="mdl-grid">
                        <div className="mdl-layout-spacer"/>
                        <div className="mdl-cell mdl-cell--6-col">
                            <span>Subj Name</span>
                        </div>
                        <div className="mdl-layout-spacer"/>
                    </div>
                    <div className="mdl-grid">
                        <div className="mdl-layout-spacer">/>
                        <div className="mdl-cell mdl-cell--6-col">
                            <span>Course Category</span>
                        </div>
                        <div className="mdl-layout-spacer"/>
                    </div>
                    <div className="mdl-grid">
                        <div className="mdl-layout-spacer"/>
                        <div className="mdl-cell mdl-cell--6-col">
                            <span>Made by user123</span>
                        </div>
                        <div className="mdl-layout-spacer"/>
                    </div>

                    <div className="mdl-grid">
                        <div className="mdl-layout-spacer"/>
                        <div className="mdl-cell mdl-cell--2-col">
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                Study
                            </button>
                        </div>
                        <div className="mdl-cell mdl-cell--2-col">
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                Add Cards
                            </button>
                        </div>
                        <div className="mdl-cell mdl-cell--2-col">
                            <span className="mdl-badge" data-badge="10">#items</span>
                        </div>
                        <div className="mdl-cell mdl-cell--2-col">
                            <span>Last Edit: 2017/04/23</span>
                        </div>
                        <div className="mdl-layout-spacer"/>
                    </div>

                    <div className="mdl-grid">
                        <StackViewStacks/>
                    </div>
                    </div>
                </div>
            </div>
        )
}
}

export default Stacks;