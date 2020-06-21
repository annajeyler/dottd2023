import React, { PureComponent } from 'react';
import hotdog from '../images/hotdog.png';

class Archive extends PureComponent {
  render() {
    return (
      <div className="archive">
        <div className="archive-item-container">
          <div className="archive-item">
            <img className="archive-item-image" src={hotdog} alt="hotdog" />
            <div className="archive-item-body">
              <div className="archive-item-body">
                <div className="archive-item-details">
                  ID# 2173213 &nbsp; &nbsp; &nbsp; 24 05 2020 1:35pm
                </div>
                <div className="archive-item-text">
                  prophecy here
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="archive-item-container">
          <div className="archive-item">
            <img className="archive-item-image" src={hotdog} alt="hotdog" />
            <div className="archive-item-body">
              <div className="archive-item-body">
                <div className="archive-item-details">
                  ID# 2173213 &nbsp; &nbsp; &nbsp; 24 05 2020 1:35pm
                </div>
                <div className="archive-item-text">
                  prophecy here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Archive;
