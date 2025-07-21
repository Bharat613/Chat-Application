import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name,setName] = useState('');
  const [room,setRoom] = useState('');
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        
        <h1 className='heading'>Let's chat</h1>
        
        <div>
          <input className="joinInput" type="text" placeholder="Enter Your Name" onChange={(event)=>setName(event.target.value)}/></div>
        <div>
          <input className="joinInput mt-20" type="text" placeholder="Room ID" onChange={(event)=>setRoom(event.target.value)}/></div>
        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
        <button className={'button mt-20'} type='submit'>Enter Room<i className="fa-solid fa-arrow-right"></i></button>
        </Link>
            <p style={{textAlign:"center",fontSize:"9px"}}>Developed by Shiva &copy; {new Date().getFullYear()}</p>

      </div>
      
    </div>
  );
}

export default Join;