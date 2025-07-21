import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'
import { useLocation } from 'react-router';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css'
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer.js';

let socket;

const Chat = () => {
  const [name,setName] = useState('');
    const [room,setRoom] = useState('');
        const [message,setMessage] = useState('')
  const [users, setUsers] = useState('');

    const [messages,setMessages] = useState([])
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  const location = useLocation();
  useEffect(() => {
  const { name, room } = queryString.parse(location.search);
  socket = io(ENDPOINT, {
    transports: ['websocket'], // Optional but helps avoid polling issues
  });

  setName(name);
  setRoom(room);

  socket.emit('join', { name, room }, (error) => {
    if (error) {
      alert(error);
    }
  });


  return () => {
    socket.disconnect();
    socket.off();
  };
}, [ENDPOINT, location.search]);

useEffect(() => {
  socket.on('message', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  socket.on("roomData", ({ users }) => {
    setUsers(users);
  });

  return () => {
    socket.off('message');
    socket.off('roomData');
  };
}, []);


    const sendMessage = (event)=>{
      event.preventDefault();
      if(message){
        socket.emit('sendMessage',message,()=> setMessage(''));
      }
    }
    console.log(message,messages);

  return (
    <div className='outerContainer'>
        <div className='container'>
          <InfoBar room={room}/>
          <Messages messages={messages} name={name}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
        <TextContainer users={users}/>
    </div>
  )
}

export default Chat;
