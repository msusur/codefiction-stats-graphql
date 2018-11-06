import React, { Component } from 'react';
import './StatsOverall.scss';

export class PodcastOverall extends Component {
  render() {
    return (
      <div>
        Total Listeners
        <span className="dashboard--value">
          {this.props.value[0].overallStats.total_listens}
        </span>
      </div>
    );
  }
}
export default PodcastOverall;
