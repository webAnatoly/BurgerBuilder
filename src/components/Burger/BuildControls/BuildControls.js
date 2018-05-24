import React from 'react';
import PropTypes from 'prop-types';
import s from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import getRandomUniqueKey from '../../../myLib/getUniqueRandomNumber';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = props => (
  <div className={s.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    { controls.map(ctrl => (
      <BuildControl
        key={getRandomUniqueKey()}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />))
    }
    <button
      className={s.OrderButton}
      disabled={!props.purchasable}
    >
      ORDER NOW
    </button>
  </div>
);

buildControls.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.object]),
  price: PropTypes.number,
  purchasable: PropTypes.bool,
};

buildControls.defaultProps = {
  disabled: {},
  price: 0,
  purchasable: true,
};

export default buildControls;
