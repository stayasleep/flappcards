import React from 'react';
import {Link} from 'react-router';

export default (props) => {
    const {name, ...rest} = props;

    return(
            <Link {...rest} className="nav-link">{name}</Link>
    );
};