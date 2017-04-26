import React, {Component} from 'react';
import FlashCardsAppBar from './app_bar_with_drawer';

class Search extends Component{
    render(){
        return (
            <div>
                <FlashCardsAppBar/>
                <div className="mdl-grid">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right mdl-cell mdl-cell--middle">
                        <label className="mdl-button mdl-js-button mdl-button--icon"
                               for="fixed-header-drawer-exp">
                            <i className="material-icons">search</i>
                        </label>
                        <div className="mdl-textfield__expandable-holder">
                            <input className="mdl-textfield__input" type="text" name="sample"
                                   id="fixed-header-drawer-exp"/>
                        </div>
                    </div>
                </div>
                <div className="mdl-grid">
                    <ul className="demo-list-three mdl-list mdl-cell mdl-cell--center">
                        <li className="mdl-list__item mdl-list__item--three-line">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">functions</i>
          <span>Physics</span>
            <span>Physics For Future Presidents</span>
            <span>Jinwoo</span>
            <span>Rating 4/5</span>
          <span className="mdl-list__item-text-body">
            See Physics decks
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
            <span>Physics 7A</span>
            <span>Chalmers</span>
            <span>Rating 4/5</span>
          <span className="mdl-list__item-text-body">
            See Physics 7A deck
          </span>
        </span>
                            <span className="mdl-list__item-secondary-content">
          <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">visibility</i></a>
        </span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search