import React from 'react';
import flash404 from '../imgs/404flash.jpg'
import FlatButton from 'material-ui/FlatButton'
import {Link} from 'react-router'

function Error404() {
    const notFound = {
        backgroundImage: `url(${flash404})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "100%",
        height: "100vh",
        position: "relative"
    };
    const errorMsg = {
        position: "absolute"
    };



        return (
            <div style={notFound}>
                <div style={errorMsg}>
                    <h1>404 Error</h1>
                    <FlatButton label="Back to Home" containerElement={<Link to="/home" name="Return"/>}/>
                </div>
            </div>
        )
}

export default Error404;