import React, { Component } from 'react';
import './OverallValue.scss';
import OverallCompareService from '../api/overall-compare-service';
import * as numeral from 'numeral';
export class OverallValue extends Component {
  render() {
    const compare = new OverallCompareService(this.props.series);
    const value = compare.setAndCompareValue(
      this.props.valueKey,
      this.props.value
    );
    return (
      <div className="dashboard--container">
        <div className="dashboard--label">{this.props.text}</div>
        <div className="dashboard--value">
          {numeral(value.currentValue).format(0, 0)}
        </div>
        <div
          className={
            value.ratio < 0 ? 'dashboard--ratio--red' : 'dashboard--ratio--blue'
          }
        >
          {value.ratio > 0 ? '+' + value.ratio : value.ratio}%
        </div>
      </div>
    );
  }
}
export default OverallValue;
