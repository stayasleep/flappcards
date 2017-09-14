/**
 * @params - (reqObject, auth)
 * @returns template literal for email with html enabled
 * */
module.exports= (reqObject,auth)=>{
    //create reset link
    let reset =`${reqObject.protocol}://${reqObject.headers.host}/reset/:?p1=${auth.t1}&p2=${auth.t2}&p3=${auth.token}`;
    return `
    <!DOCTYPE html>
    <head>
        <style>
            .btnReset:hover{
                background: white !important;
                color: black !important;
            }
        </style>
    </head>
    <body style="width: 100%">
    <h2>Hello ${reqObject.body.userName},</h2>
    <p>You are receiving this email because you have requested a password
    reset.  In order to complete the process, please click on the button below.  The password
     reset link expires after four (4) hours and can only be used once.  After that time,
     the link will no longer be valid and the reset form will no longer appear to be active.
     </p>
    
     <div class="btnContainer">
         <a class="btnReset" style="display: inline-block; padding:1em 2em; border: 2px solid black; border-radius: 1em;text-decoration: none; color:white; font-weight: 700; background: black" href="${reset}" target="_blank" >
            Reset Password &rarr;
         </a>
     </div>
     
     <p>If you can&apos;t click on the button above, please copy and paste the URL into 
     your browser.</p>
     
     ${reqObject.protocol}://${reqObject.headers.host}/reset/:?p1=${auth.t1}&p2=${auth.t2}&p3=${auth.token}
     
     <p>If you didn&apos;t request a password reset, please ignore this email and your password 
     will remain unchanged.</p>
     
     <p><em>Thanks,</em></p>
     <p>The FlappCards Team</p>
     </body>
     </html>
    `
};