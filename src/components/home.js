import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';

class Home extends Component {
    render(){
        return(
            <div>
                <FlashCardsAppBar/>
                <div className="mdl-grid">
                    <ul className="demo-list-three mdl-list mdl-cell mdl-cell--center">
                        <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">functions</i>
          <span>Math</span>
            <span>Calc 1</span>
            <span># of cards</span>
            <span>user: brian</span>
          <span className="mdl-list__item-text-body">
            See your deck
          </span>
        </span>
                            <span className="mdl-list__item-secondary-content">
          <a className="mdl-list__item-secondary-action" href="sample_card.html"><i className="material-icons">visibility</i></a>
        </span>
                        </li>
                        <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons  mdl-list__item-avatar">functions</i>
          <span>Biology</span>
            <span>Human Biology</span>
            <span># of cards</span>
            <span>user: brian</span>
          <span className="mdl-list__item-text-body">
            See your biology decks
          </span>
        </span>
                            <span className="mdl-list__item-secondary-content">
          <a className="mdl-list__item-secondary-action" href="sample_card.html"><i className="material-icons">visibility</i></a>
        </span>
                        </li>
                    </ul>
                </div>
                <div>Here is Some Aggregated Content To Get Your Attention</div>
                <div className="mdl-grid">
                    <ul className="demo-list-three mdl-list mdl-cell mdl-cell--center">
                        <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">functions</i>
          <span>Math</span>
            <span>Calc 2</span>
			<span>user:Brian</span>
			<span>Rating 4/5</span>
            <span># items</span>
          <span className="mdl-list__item-text-body">
            See Calc 2 deck
          </span>
        </span>
                            <span className="mdl-list__item-secondary-content">
          <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">visibility</i></a>
        </span>
                        </li>
                        <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons  mdl-list__item-avatar">functions</i>
          <span>Math</span>
		  <span>Calc 3</span>
		  <span>user:Chalmers</span>
		  <span>Rating 4/5</span>
          <span># items</span>
          <span className="mdl-list__item-text-body">
            See  Calc 3 deck
          </span>
        </span>
                            <span className="mdl-list__item-secondary-content">
          <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">visibility</i></a>
        </span>
                        </li>
                        <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons  mdl-list__item-avatar">functions</i>
          <span>Math</span>
		  <span>Geometry</span>
		  <span>user:Andres</span>
		  <span>Rating 4/5</span>
          <span>#items</span>
          <span className="mdl-list__item-text-body">
           See Geometry deck
          </span>
        </span>
                            <span className="mdl-list__item-secondary-content">
          <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">visibility</i></a>
        </span>
                        </li>
                        <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons  mdl-list__item-avatar">functions</i>
          <span>Physics</span>
		  <span>Physics For Future Presidents</span>
		  <span>user:Jinwoo</span>
		  <span>Rating 4/5</span>
          <span>#items</span>
          <span className="mdl-list__item-text-body">
           See Physics For Future Presidents deck
          </span>
        </span>
                            <span className="mdl-list__item-secondary-content">
            <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">visibility</i></a>
        </span>
                        </li>
                    </ul>
                </div>
                <div className="mdl-grid">
                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-cell--10-offset mdl-cell--middle" onclick="window.location='create_deck.html';">
                        <i className="material-icons">create</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Home