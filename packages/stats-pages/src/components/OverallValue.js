import React from 'react';
import './OverallValue.scss';
import * as numeral from 'numeral';
import OverallCompareService from '../api/overall-compare-service';
import Badge from './ui/Badge';

const OverallValue = ({ series, valueKey, value, text }) => {
  const compare = new OverallCompareService(series);
  const comparedValue = valueKey
    ? compare.setAndCompareValue(valueKey, value)
    : undefined;
  return (
    <div className="dashboard--container">
      {text && <div className="dashboard--label">{text}</div>}
      <div className="dashboard--value">
        {valueKey ? numeral(comparedValue.currentValue).format(0, 0) : value}
        {comparedValue && (
          <Badge className="dashboard--badge" value={comparedValue.ratio}>
            {comparedValue.ratio}%
          </Badge>
        )}
      </div>
    </div>
  );
};

export default OverallValue;
