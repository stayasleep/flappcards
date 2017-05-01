// File containing user info
// Presumably, transmitting a response containing *all* users to a request from a *single* user is probably considered
// poor form, but this is a dry run
let users = {
    user1: {
        fullName: "Kevin Chalmers",
        userName: "kchalm",
        user_pw: "Password2",
        user_email: "email2@Server.com",
        birthday: "02/02/1901"
    },
    user2: {
        fullName: "Brian Bernstein",
        userName: "stayasleep",
        user_pw: "Password1",
        user_email: "email@Server.com",
        birthday: "01/01/1900"
    }
};

module.exports = users;