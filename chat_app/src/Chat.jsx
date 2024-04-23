import {useState, useEffect} from 'react';

function Chat({setIsLoggedIn}) {
    const [word, setWord] = useState('');
    const [newWord, setNewWord] = useState('');
    const [username, setUsername] = useState('');
    const [chatList, setChatList] = useState('');
    const [chatTimeList, setTimeList] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            fetch('/api/word')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    setWord(data.storedWord);
                    setChatList(data.curChat);
                    setTimeList(data.curChatTime);
                    setUsername(data.username);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });


            fetch('/api/session/allUser')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network Error! Failed to fetch word.');
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        };
        fetchData(); // 组件加载后立即调用一次 fetchData

        const intervalId = setInterval(fetchData, 500); // 每2秒调用一次 fetchData

        // 组件卸载时清除定时器
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        if (word) {
            setIsBlinking(true);
            setTimeout(() => {
                setIsBlinking(false);
            }, 500);
        }
    }, [word]);

    const updateWord = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch('/api/word', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({word: newWord}),
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setWord(newWord);
                    setChatList(data)
                    setError('');
                })
            } else {
                response.json().then(data => {
                    if (response.status === 400) {
                        setError('Word is not made up of valid characters, please try again!');
                    } else if (response.status === 401) {
                        setError('Authentication missing, please log out and try again!');
                    } else {
                        setError(data.error || 'Failed to update word. Please logout and try again.');
                    }
                }).catch(() => {
                    setError('Failed to update word. Please logout and try again.');
                });
            }
        }).then(data => {
            console.log(data)
        })
            .catch(() => {
                setError('Service is unreachable. Please try again later.');
            }).finally(() => {
            setLoading(false);
        });

    };

    const logout = () => {
        fetch('/api/session', {method: 'DELETE'})
            .then(() => {
                setIsLoggedIn(false);
            }).catch(() => {
            setIsLoggedIn(false);
        });
    };

    if (loading) {
        return <i className="gg-spinner"></i>;
    }

    return (
        <div className="word-page">
            <h1>Chat App</h1>
            <div className="word-field">
                <div className="loggedin-users">
                    Username:<br/>{username}
                </div>
                <div className="chat">
                    {chatList.length === 0 ? (
                        <p>No chat content yet</p>
                    ) : (
                        <>
                            <p className="message-heading">Message:</p>
                            {chatList.map((item) => (
                                <ul className="chat-list">
                                    {Object.keys(item).map((key) => {
                                        const value = item[key];
                                        // 构造chatTimeList中可能的键，这里假设chatTimeList的键为 "key_value" 的形式
                                        const chatTimeKey = `${key}_${value}`;
                                        return (
                                            <li key={key} className="chat-list-item">
                                                {chatTimeList.find(obj => Object.keys(obj).includes(chatTimeKey)) && (
                                                    <span className="time">
                                                        {chatTimeList.find(obj => Object.keys(obj).includes(chatTimeKey))[chatTimeKey]}
      </span>
                                                )}
                                                <span className="separator">•</span>
                                                <span className="username">{key}</span>
                                                <span className="separator">:</span>
                                                <span className="message">{value}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ))}
                        </>
                    )}
                </div>

            </div>
            <form onSubmit={updateWord}>
                <div className="login-username-input">
                    <input
                        type="text"
                        placeholder="Message"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                    />
                </div>
                <button className="update-btn" type="submit">Send Message</button>
            </form>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
    );
}

export default Chat;
