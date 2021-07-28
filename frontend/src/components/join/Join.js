import React, { useState } from 'react';
import './Join.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

let user;

const Join = () => {

    const [name, setName] = useState('');

    const sendUser = () => {
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value='';
    }

    return (
        <div className="joinPage">
            <div className="joinContainer">
                <img src={logo} alt="logo" />
                <h1>React Chat App</h1>

                <input onChange={(e) => setName(e.target.value)} type="text" id="joinInput" placeholder="Enter Your Name" onKeyPress={(e) => e.key === 'Enter' ? sendUser() : null} />

                <Link onClick={(e) => !name ? e.preventDefault() : null} to='/chat'>
                    <button  className="joinBtn" onClick={sendUser}type="submit">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
export {user}