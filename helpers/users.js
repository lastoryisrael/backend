
const User = require("../models/user");
const users = [];
function createUser(user) {
   users.push(user);
}

function getUser(email) {
    const thisUser = User.find(user => user.email === email);
    return thisUser;
}

function updateUser(user) {
    const thisUserIndex = users.findIndex(local => local.email === user.email);
    users[thisUserIndex] = user;
}

module.exports = {
    createUser,
    getUser,
    updateUser,
}