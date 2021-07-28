import React, { useEffect, useState } from 'react';
import { user } from '../join/Join';
import './Chat.css';
import sendLogo from '../../images/sendLogo.png'
import socketIO from 'socket.io-client';
import Message from '../message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../../images/closeIcon.png';
import { Link } from 'react-router-dom';

const ENDPOINT = 'https://react-chat-app-arjun.herokuapp.com/';
let socket;

const Chat = () => {
    const [id, setId] = useState('');
    const [messages , setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;

        socket.emit('message', {message, id});
        document.getElementById('chatInput').value = '';
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, {transports: ['websocket']});

        socket.on('connect', () => {
            setId(socket.id)
            // alert('connected..');

        })

        socket.emit('joined', {user});

        socket.on('welcome', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message)
        });

        socket.on('leave',(data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message)
        })

        return () =>{
            socket.emit('disconnect');
            socket.off();
        }

    },[])

    useEffect(() => {

        socket.on('sendMessage', (data) => {
            console.log(data.user, data.message, data.id)
            setMessages([...messages,data]);
        })
        return () => {
            socket.off();
        }
    },[messages])

    return (
        <div className="chatPage">
            <div className="charContainer">
                <div className="header">
                    <h2>React Chat App</h2>
                    <a className="closeBtn" href="/"><img src={closeIcon} alt="close"/></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    { messages.map((item, i) => <Message user={item.id===id?'':item.user} message={item.message} classs={item.id ===id?'right':'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(e) => e.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn" ><img src={sendLogo} alt="send"/></button>
                </div>
            </div>
        </div>
    )
}

export default Chat
