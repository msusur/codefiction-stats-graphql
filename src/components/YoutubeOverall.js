import React, { Component } from 'react';
import './StatsOverall.scss';

export class YoutubeOverall extends Component {
  render() {
    return (
      <div>
        Toplam Youtube Takipcisi
        <span className="dashboard--value">
          {this.props.value.subscriberCount}
        </span>
      </div>
    );
  }
}

export default YoutubeOverall;
