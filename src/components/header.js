import React from 'react';
import {Link} from 'react-router';

export default () => (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">Profile</span>
            </div>
        </header>
        <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Profile</span>
            <nav className="mdl-navigation">
                <Link to="/" className="mdl-navigation__link">Profile</Link>
                <Link to="/" className="mdl-navigation__link">My Shelf</Link>
                <Link to="/" className="mdl-navigation__link">Search</Link>
                <Link to="/" className="mdl-navigation__link">Logout</Link>
            </nav>
        </div>
        <main className="mdl-layout__content">
        </main>
    </div>
)