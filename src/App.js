import React, { PureComponent } from 'react';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      foundPlatform: null,
    }
  }

  componentDidMount() {
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.setState({
        foundPlatform: 'mobile',
      });
     } else {
      this.setState({
        foundPlatform: 'desktop',
      });
     }
  }
  
  renderApp = () => {
    switch (this.state.foundPlatform) {
      case 'mobile':
        return <MobileApp />
      case 'desktop':
        return <DesktopApp />
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="app">
        {this.renderApp()}
      </div>
    );
  }
}

export default App;
