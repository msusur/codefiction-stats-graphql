import React, { Component } from 'react';
import EpisodesChart from './components/EpisodesChart';

export class App extends Component {
  render() {
    return (
      <div className="main">
        <EpisodesChart />
      </div>
    );
  }
}

export default App;
