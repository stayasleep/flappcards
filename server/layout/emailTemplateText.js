
/**
 * @params - (reqObject, auth)
 * @returns returns template literal for email in the case that html is disabled
 * */
module.exports=(reqObject,auth)=>{
    return `
        You are receiving this email because you have requested a password
    reset.  In order to complete the process, please copy and paste the link below into your browser.  The password
     reset link expires after four (4) hours and can only be used once.  After that time,
     the link will no longer be valid and the reset form will no longer appear to be active.
     
     ${reqObject.protocol}://${reqObject.headers.host}/reset/:?p1=${auth.t1}&p2=${auth.t2}&p3=${auth.token}

     If you didn&apos;t request a password reset, please ignore this email and your password 
     will remain unchanged.
     
     Thanks,
     The FlappCards Team
    `
};