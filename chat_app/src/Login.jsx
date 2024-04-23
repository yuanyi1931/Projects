import { useState } from 'react';

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch('/api/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        }).then(response => {
            setLoading(false);
            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                response.json().then(data => {
                    if (response.status === 400) {
                        setError('Username is not made up of valid characters.');
                    } else if (response.status === 403) {
                        setError('Username "dog" is not allowed.');
                    } else {
                        setError(data.error || 'Login failed. Please try again.');
                    }
                }).catch(() => {
                    setError('Login failed. Please try again.');
                });
            }
        }).catch(() => {
            setLoading(false);
            setError('Service is unreachable. Please try again later.');
        });

    };

    return (
        <div className="login-page">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Please enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="error-msg-container"> {error && <div className="error-msg">{error}</div>} </div>
                <button className="login-btn" type="submit" disabled={loading}>Login</button>
            </form>
            {loading && <i className="gg-spinner"></i>}
        </div>
    );
}

export default Login;
