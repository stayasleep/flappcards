/**
 * @param reqObject
 * @returns template literal for successful password reset email html template
 * */
module.exports = (reqObject)=>{
    return `
    <!DOCTYPE html>
    <head>
    </head>
    <body>
        <div>
            <h2>Hello ${reqObject.decoded.UserName},</h2>
            <p>This is to confirm that the password for your account on 
            ${reqObject.headers.host} has successfully been reset.  </p>
            
            <p><em>Sincerely,</em></p>
            <p>The FlappCards Team</p>
        </div>
    
    </body>
    </html>
    `
};