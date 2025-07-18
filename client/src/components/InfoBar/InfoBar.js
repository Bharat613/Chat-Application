import React from 'react';

import onlineIcon from '../../images/onlineIcon.png';
import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>Room ID : {room}</h3>
    </div>
    <p className='encrypt' style={{fontWeight:"400",fontSize:"15px"}}>end-to-end encrypted <i class="fa-solid fa-lock"></i></p> 
    
    <div className="rightInnerContainer">
      <a id="exit" href="/">Exit Room</a>
    </div>  
     
  </div>
);

export default InfoBar;