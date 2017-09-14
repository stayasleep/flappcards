/**
 * @param reqObject
 * @returns email text template from a template literal
 * */

module.exports=(reqObject)=>{
    return `
    Hello ${reqObject.decoded.UserName},
    This is to confirm that the password for your account on ${reqObject.headers.host} 
    has successfully been reset.  
    
    Sincerely,
    The FlappCards Team
    `
};