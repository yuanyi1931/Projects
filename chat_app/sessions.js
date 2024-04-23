const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
    const sid = uuid();
    sessions[sid] = {
        username,
    };
    return sid;
}

function getSessionUser(sid) {
    return sessions[sid]?.username;
}

function getAllUser(sid) {
    return Object.keys(sessions).map((sid) => sessions[sid]?.username);
}

function deleteSession(sid) {
    delete sessions[sid];
}

module.exports = {
    addSession,
    deleteSession,
    getSessionUser,
    getAllUser,
};
