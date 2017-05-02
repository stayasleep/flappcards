import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';

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
                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">What is the power house of the cell?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a href="page09.html" className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>

                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">Plants are considered __ in the food chain?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>

                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">What is the power house of the cell?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>

                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">What is the power house of the cell?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>

                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">What is the power house of the cell?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>

                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">What is the power house of the cell?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>

                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">What is the power house of the cell?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>

                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">What is the power house of the cell?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                        </div>

                        <div className="mdl-card mdl-shadow--2dp demo-card-square">
                            <div className="mdl-card__title mdl-card--expand">
                                <div className="mdl-card__title-text">What is the power house of the cell?</div>
                            </div>
                            <div className="mdl-card__supporting-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <a className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Study
                                </a>
                            </div>
                            <div className="mdl-card__menu">
                                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i className="material-icons">delete_forever</i>
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
}

export default Stacks;