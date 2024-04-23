import { useState } from 'react';
import './App.css';
import Login from './Login';
import Chat from './Chat';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {isLoggedIn ? <Chat setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </div>
    );
}

export default App;
