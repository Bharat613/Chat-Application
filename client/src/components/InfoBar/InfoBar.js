import React from 'react';

import onlineIcon from '../../images/onlineIcon.png';
import closeIcon from '../../images/closeIcon.png';
import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>Room ID : {room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a id="exit" href="/">Exit Room <img id="close" src={closeIcon} alt="close icon" /></a>
    </div>    
  </div>
);

export default InfoBar;