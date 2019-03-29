import React, { Component } from 'react';
import './OverallValue.scss';
import * as numeral from 'numeral';
import OverallCompareService from '../api/overall-compare-service';
import Badge from './ui/Badge';

export class OverallValue extends Component {
  render() {
    const { series, valueKey, value, text } = this.props;
    const compare = new OverallCompareService(series);
    const comparedValue = compare.setAndCompareValue(valueKey, value);
    return (
      <div className="dashboard--container">
        <div className="dashboard--label">{text}</div>
        <div className="dashboard--value">
          {numeral(comparedValue.currentValue).format(0, 0)}
          <Badge className="dashboard--badge" danger={comparedValue.ratio < 0}>
            {comparedValue.ratio > 0
              ? `+${comparedValue.ratio}`
              : comparedValue.ratio}
            %
          </Badge>
        </div>
      </div>
    );
  }
}
export default OverallValue;
