import React from 'react';
import flash404 from '../imgs/404Error.png'
import FlatButton from 'material-ui/FlatButton'
import {Link} from 'react-router'

function Error404() {
    const notFound = {
        backgroundImage: `url(${flash404})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "100vw",
        height: "100vh",
        position: "relative"
    };
    const errorMsg = {
        position: "absolute"
    };



        return (
            <div style={notFound}>
                <div style={errorMsg}>
                    <FlatButton label="Back to Home" containerElement={<Link to="/home" name="Return"/>}/>
                </div>
            </div>
        )
}

export default Error404;