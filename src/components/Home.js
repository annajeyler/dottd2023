import React, { PureComponent } from 'react';
import moth from '../images/moth.gif';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state= {

    }
  }

  onDropImage = () => {
    // TODO: what local state do we need?
    this.props.openProcessingPanel();
  }

  render() {
    return (
      <div className="home">
        <div className="title-text">
          D . o . t . T . D
        </div>
        <div className="upload-panel">
          <div className="moth">
            <img src={moth} alt="moth" />
          </div>
          <div className="upload-box-container">
            <div
              className="upload-box"
              onClick={this.onDropImage}
            >
              +
            </div>
            <div className="upload-button">
              Awaiting hotdog image...
            </div>
          </div>
          <div className="moth">
            <img src={moth} alt="moth" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
