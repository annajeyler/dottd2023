import React from 'react';
import moth from './images/moth.gif'
import './App.css';

const MobileApp = (props) => {
  return (
    <div className="mobile-app">
      <div className="mobile-body">
        <div className="mobile-text-holder">
          We notice that you are using a mobile device...
          <br />
          <img src={moth} alt="moth" />
          <br />
          You are advised to download our mobile app to  commune with the digital divine.
        </div>
        <div className="mobile-buttons-holder">
          <div className="mobile-button">
            Android
          </div>
          <div className="mobile-button">
            iOS
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
