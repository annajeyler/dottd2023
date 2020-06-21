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
    this.state= {
      isProcessingPanelOpen: false,
      isArchiveOrHome: 'home',
    }
  }

  onHomeClick = () => {
    // window.open('https://fonderiedarling.org/Place-Publique-FD.html');
    this.setState({
      isArchiveOrHome: 'home',
    });
  }

  onArchiveClick = () => {
    this.setState({
      isArchiveOrHome: 'archive',
    });
  }

  onDownloadClick = () => {

  }

  onMuteClick = () => {

  }

  openProcessingPanel = () => {
    this.setState({
      isProcessingPanelOpen: true,
    })
  }

  closeProcessingPanel = () => {
    this.setState({
      isProcessingPanelOpen: false,
    })
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
          <div className="processing-panel-body">
            blah
            <br />
            prophecy text here
          </div>
        </div>
      </div>
    ) : null;
  }

  renderMainArea = () => {
    return this.state.isArchiveOrHome === 'home' ? this.renderHome() : this.renderArchive();
  }

  renderHome = () => {
    return <Home openProcessingPanel={this.openProcessingPanel} />
  }

  renderArchive = () => {
    return <Archive />
  }

  render() {
    return (
      <div className="app">
        {this.renderProcessingPanel()}
        <div className="header">
          <div className="left-header">
            D.o.t.T.D
          </div>
          <div className="header-buttons">
            <Button onClick={this.onHomeClick} src={home}></Button>
            <Button onClick={this.onArchiveClick} src={world}></Button>
            <Button onClick={this.onDownloadClick} src={sun}></Button>
            <Button onClick={this.onMuteClick} src={sound}></Button>
          </div>
          <div className="right-header">
            D.o.t.T.D
          </div>
        </div>
        {this.renderMainArea()}
      </div>
    );
  }
}

export default App;
