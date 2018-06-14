import React from 'react';
import PropTypes from 'prop-types';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import s from './CheckoutSummary.css';

const CheckoutSummary = props => (
  <div className={s.CheckoutSummary}>
    <h1>Приятного аппетита!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button
      btnType="Danger"
      clicked={() => 'Empty function. Just placeholder. Replace this function with normal function'}
    >
      ОТМЕНИТЬ
    </Button>
    <Button
      btnType="Success"
      clicked={() => 'Empty function. Just placeholder. Replace this function with normal function'}
    >
      ПРОДОЛЖИТЬ
    </Button>
  </div>
);

CheckoutSummary.propTypes = {
  ingredients: PropTypes.oneOfType([
    PropTypes.object,
  ]),
};

CheckoutSummary.defaultProps = {
  ingredients: null,
};

export default CheckoutSummary;
