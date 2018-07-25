import React from 'react';
import PropTypes from 'prop-types';
import s from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import getRandomUniqueKey from '../../../myLib/getUniqueRandomNumber';

const controls = [
  { label: 'Салат', type: 'salad' },
  { label: 'Бекон', type: 'bacon' },
  { label: 'Сыр', type: 'cheese' },
  { label: 'Мясо', type: 'meat' },
];

const buildControls = props => (
  <div className={s.BuildControls}>
    <p>Цена: <strong>{props.price.toFixed(2)} р.</strong></p>
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
      onClick={props.ordered}
    >
      {props.isAuth ? 'СДЕЛАТЬ ЗАКАЗ' : 'ВОЙДИТЕ ЧТОБЫ СДЕЛАТЬ ЗАКАЗ'}
    </button>
  </div>
);

buildControls.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.object]),
  price: PropTypes.number,
  purchasable: PropTypes.bool,
  ordered: PropTypes.func,
  isAuth: PropTypes.bool,
};

buildControls.defaultProps = {
  disabled: {},
  price: 0,
  purchasable: true,
  ordered: () => false,
  isAuth: null,
};

export default buildControls;
