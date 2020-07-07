import React, { PureComponent } from 'react';
import Button from './components/ui/Button.js';
import Home from './components/Home.js';
import Archive from './components/Archive.js';
import home from './images/home.png';
import sound from './images/sound.png';
import sun from './images/sun.png';
import world from './images/world.png';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isProcessingPanelOpen: false,
      isArchiveOrHome: 'home',
      isHotDog: false,
      prophecy: null,
      archivedItems: [],
      isAudioPlaying: false,
    }
  }

  componentDidMount() {
    // https://franker-backend.herokuapp.com
    this.fetchArchiveItems();
  }
  
  fetchArchiveItems = () => {
    fetch('http://localhost:8080/items')
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        console.log(json.items);
        this.setState({
          archivedItems: json.items,
        });
      })
  }

  onHomeClick = () => {
    this.setState({
      isArchiveOrHome: 'home',
    });
  }

  onArchiveClick = () => {
    this.setState({
      isArchiveOrHome: 'archive',
    });
  }

  onDarlingClick = () => {
    window.open('https://fonderiedarling.org/en/D.o.t.T.D.html');
  }

  onAudioClick = () => {
    const newState = this.state.isAudioPlaying ? false : true;
    this.setState({
      isAudioPlaying: newState,
    }, () => {
      if (newState === true) {
        this.audioRef.play();
      } else {
        this.audioRef.pause();
      }
    });
  }

  openProcessingPanel = (isHotDog, prophecy) => {
    this.setState({
      isProcessingPanelOpen: true,
      isHotDog,
      prophecy,
    })
  }

  closeProcessingPanel = () => {
    this.setState({
      isProcessingPanelOpen: false,
    })
  }

  renderProphecyText = () => {
    const text = this.state.isHotDog ? this.state.prophecy : 'It appears this is not a hot dog. Please try another image.';
    return {__html: text};
  }

  renderProcessingPanel = () => {
    return this.state.isProcessingPanelOpen ? (
      <div className="processing-panel-container">
        <div className="processing-panel">
          <div className="processing-panel-topbar">
            <div>
              proph.v2.13
            </div>
            <div
              className="processing-panel-close-button"
              onClick={this.closeProcessingPanel}
            >
              X
            </div>
          </div>
          <div dangerouslySetInnerHTML={this.renderProphecyText()} className="processing-panel-body">
          </div>
        </div>
      </div>
    ) : null;
  }

  renderMainArea = () => {
    return this.state.isArchiveOrHome === 'home' ? this.renderHome() : this.renderArchive();
  }

  renderHome = () => {
    return <Home openProcessingPanel={this.openProcessingPanel} fetchArchiveItems={this.fetchArchiveItems} />
  }

  renderArchive = () => {
    return <Archive archivedItems={this.state.archivedItems} />
  }

  onPlay = () => {
    this.setState({
      isAudioPlaying: true,
    });
  }

  getRightHeaderClass = () => {
    return this.state.isArchiveOrHome === 'home' ? 'right-header hidden' : 'right-header';
  }

  render() {
    return (
      <div className="app">
        <audio onPlay={this.onPlay} ref={(input) => {this.audioRef = input}} autoPlay={true}>
          <source src="dotd.mp3" type="audio/mpeg" />
        </audio>
        {this.renderProcessingPanel()}
        <div className="header">
          <div className="left-header">
            D.o.t.T.D
          </div>
          <div className="header-buttons">  
            <Button onClick={this.onHomeClick} src={home}></Button>
            <Button onClick={this.onArchiveClick} src={world}></Button>
            <Button onClick={this.onDarlingClick} src={sun}></Button>
            <Button onClick={this.onAudioClick} src={sound}></Button>
          </div>
          <div className={this.getRightHeaderClass()}>
            D.o.t.T.D
          </div>
        </div>
        {this.renderMainArea()}
      </div>
    );
  }
}

export default App;
