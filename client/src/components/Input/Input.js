import React from 'react';
import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh
    sendMessage(event);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        className='input'
        type='text'
        placeholder='Type a message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />
<<<<<<< HEAD
      <button className='sendButton' type='submit'>Send&nbsp;&nbsp;&nbsp;  <i style={{ fontSize: '20px' }} className="fa-solid fa-paper-plane"></i>
=======
      <button className='sendButton' type='submit'>Send<i style={{ fontSize: '20px' }} className="fa-solid fa-paper-plane"></i>
>>>>>>> 6119d6f (updated css)
</button>
    </form>
  );
};

export default Input;
