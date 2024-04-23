const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');

const curChat= [];
const curChatTime= [];
app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    debugger
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.get('/api/session/allUser', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !username) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    const loggedInUserList = sessions.getAllUser();
    res.json({ username, sid, loggedInUserList });
});



app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if(!users.isValidUsername(username)) {
        console.log(username);
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);

    res.cookie('sid', sid);
    users.wordFor[username] ||= "";

    res.json({ username });
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(sid) {
        res.clearCookie('sid');
    }

    if(username) {
        sessions.deleteSession(sid);
    }

    res.json({ wasLoggedIn: !!username });
});


app.get('/api/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const storedWord = users.wordFor[username] || "";
    res.json({ username, storedWord, curChat, curChatTime});
});

app.put('/api/word', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { word } = req.body;

    if(!word && word !== '') {
        res.status(400).json({ error: 'required-word' });
        return;
    }

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    let hours = String(currentDate.getHours()).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');
    let seconds = String(currentDate.getSeconds()).padStart(2, '0');
    let dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const usernameAndWord = {};
    const usernameAndWordTime = {};
    usernameAndWord[username] = word;
    usernameAndWordTime[username+'_'+word] = dateString;
    curChat.push(usernameAndWord);
    curChatTime.push(usernameAndWordTime);
    console.log(curChatTime)
    res.json(curChat);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

