import React from 'react';
import {Link, IndexLink} from 'react-router';

export default (props) => {

    const {name, ...rest} = props;

    return(
        <li className="nav-item">
            <Link {...rest} className="nav-link">{name}</Link>
        </li>
    );
};