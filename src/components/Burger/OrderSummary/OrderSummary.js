import React from 'react';
import PropTypes from 'prop-types';
import getUniqueKey from '../../../myLib/getUniqueRandomNumber';
import Aux from '../../../hoc/Aux';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingrKey => (
      <li key={getUniqueKey()} myIdAsNumber={4}>
        <span style={{ textTransform: 'capitalize' }}>{ingrKey}</span>: {props.ingredients[ingrKey]}
      </li>
    ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};


OrderSummary.propTypes = {
  // ingredients: PropTypes.instanceOf(PropTypes.object),
  ingredients: PropTypes.oneOfType([PropTypes.object]),
};

OrderSummary.defaultProps = {
  ingredients: {},
};

export default OrderSummary;
