import React from 'react';
import { Link } from 'react-router';


const ResetExpired = (props) =>{
    return(
        <div className="expired-component">
            <div className="invalidContainer">
                <div className="invalidPaper">
                    <h1 className="">FlappCards Reset Password</h1>
                    <h4>The password reset link has expired.  Please start the password recovery process over again, thank you.</h4>
                    <div className="invalidOptions">
                        <div className="divButton">
                            <Link to="/login/forgotpassword">Forgot Password?</Link>
                        </div>
                        <div>
                            <Link to="/">Back To Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ResetExpired;