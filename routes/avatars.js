const path = require('path');
const fs = require('fs');
const avatarDictionary = require('./avatar_dictionary');

const avatars = function(request,response) {
    console.log("avatars request", request.params.avatarImage);
    let avatarImageKey = request.params.avatarImage;
    let avatarPic = avatarDictionary[avatarImageKey];
    console.log("avatarPic", avatarPic);
    response.sendFile(path.resolve(avatarPic));
};

module.exports = avatars;