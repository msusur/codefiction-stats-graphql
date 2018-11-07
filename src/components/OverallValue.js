import React, { Component } from 'react';
import './OverallValue.scss';
import OverallCompareService from '../api/overall-compare-service';

export class OverallValue extends Component {
  render() {
    const compare = new OverallCompareService();
    const value = compare.setAndCompareValue(this.props.valueKey, this.props.value);
    return (
      <div>
        {this.props.text}
        <span className="dashboard--value">
          {value.currentValue}
        </span>
      </div>
    );
  }
}
export default OverallValue;
