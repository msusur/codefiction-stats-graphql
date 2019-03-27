import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './OverallValue.scss';
import * as numeral from 'numeral';
import { OverallCompareService } from '../api/overall-compare-service';

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
          {value.ratio > 0 ? `+${value.ratio}` : value.ratio}%
        </div>
      </div>
    );
  }
}

OverallValue.propTypes = {
  series: PropTypes.array,
  valueKey: PropTypes.string,
  value: PropTypes.string,
  text: PropTypes.string,
};
export default OverallValue;
