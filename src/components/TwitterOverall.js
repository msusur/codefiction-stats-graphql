import React, { Component } from 'react';
import './StatsOverall.scss';

export class TwitterOverall extends Component {
  render() {
    if (!this.props.value) {
      return <div>Can't get twitter followers now.</div>;
    }
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
