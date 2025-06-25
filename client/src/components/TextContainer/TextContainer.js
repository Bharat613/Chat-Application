import React from 'react';

import onlineIcon from '../../images/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
<<<<<<< HEAD
=======
    
>>>>>>> 1e0655ae4aa2b05c3d63b671dc540622fc19ea82
    {
      users
        ? (
          <div>
            <h1>Currently Online</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;
