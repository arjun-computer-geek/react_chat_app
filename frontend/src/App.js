import React from 'react'
import socketIO from 'socket.io-client'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Join from './components/join/Join'
import Chat from './components/chat/Chat'

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIO(ENDPOINT, {transports: ['websocket']});

const App = () => {

    return (
        <Router>
            <Route path='/' component={Join} exact/>
            <Route path='/chat' component={Chat} />
        </Router>
    )
}

export default App
