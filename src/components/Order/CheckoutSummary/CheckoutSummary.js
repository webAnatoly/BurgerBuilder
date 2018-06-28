import React from 'react';
import PropTypes from 'prop-types';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import s from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
  let h1 = 'Надеемся вам понравится!';
  let isEmpty = false;
  if (Object.keys(props.ingredients).length === 0) {
    h1 = 'Пустой бутерброд';
    isEmpty = true;
  }
  return (
    <div className={s.CheckoutSummary}>
      <h1>{h1}</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} checkoutHaveIngredients={isEmpty} />
      </div>
      <Button
        btnType="Danger"
        clicked={props.checkoutCancelled}
      >
        ОТМЕНИТЬ
      </Button>
      <Button
        btnType="Success"
        clicked={props.checkoutContinued}
      >
        ПРОДОЛЖИТЬ
      </Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

CheckoutSummary.defaultProps = {
  ingredients: null,
};

export default CheckoutSummary;
