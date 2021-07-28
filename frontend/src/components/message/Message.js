import React from 'react';
import './Message.css';

const Message = ({user, classs, message}) => {
    if(user){
        return (
            <div className= {`messageBox ${classs}`} >
                {`${user} : ${message}`}
            </div>
        )
    }
    else{
        return (
            <div className= {`messageBox ${classs}`} >
                {`You : ${message}`}
            </div>
        )
    }
}

export default Message
