import React from 'react';
import PropTypes from 'prop-types';
import s from './Order.css';
import randomKey from '../../myLib/getUniqueRandomNumber';
import { lang } from '../../lang/ru/russian'; // Языковой пакет. В будущем планирую подгружать его динамически в зависимости от выбранного языка


const Order = props => (
  <div className={s.Order}>
    {Object.entries(props.ingredients).map(ingr => (
      <span
        key={randomKey()}
        className={s.Ingredient}
      >
        {`${lang.ingredientsNames[ingr[0]]}: (${ingr[1]}); `}
      </span>
    ))}
    <p>{lang.price}:  {props.price} {lang.currency[1]}.</p>
  </div>
);

Order.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.object]),
  price: PropTypes.number,
};

Order.defaultProps = {
  ingredients: PropTypes.array,
  price: 0,
};

export default Order;
