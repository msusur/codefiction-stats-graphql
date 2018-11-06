import React, { Component } from 'react';
import './StatsOverall.scss';

export class TwitterOverall extends Component {
  render() {
    return (
      <div>
        Twitter followers
        <span className="dashboard--value">
          {this.props.value.followersCount}
        </span>
      </div>
    );
  }
}

export default TwitterOverall;
