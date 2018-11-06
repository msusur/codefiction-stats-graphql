import React, { Component } from 'react';
import './StatsOverall.scss';

export class TwitterOverall extends Component {
  render() {
    if (!this.props.value) {
      return <div>Twitter'da sorun oldu.. :(</div>;
    }
    return (
      <div>
        Toplam Twitter Takipcisi
        <span className="dashboard--value">
          {this.props.value.followersCount}
        </span>
      </div>
    );
  }
}

export default TwitterOverall;
