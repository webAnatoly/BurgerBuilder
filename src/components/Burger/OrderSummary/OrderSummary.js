import React from 'react';
import PropTypes from 'prop-types';
import getUniqueKey from '../../../share/getUniqueRandomNumber';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const ingredientsNames = {
  salad: 'Салат',
  cheese: 'Сыр',
  meat: 'Мясо',
  bacon: 'Бекон',
};

class OrderSummary extends React.PureComponent {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((ingrKey) => {
        let li = null;
        if (this.props.ingredients[ingrKey]) {
          li = (
            <li key={getUniqueKey()}>
              <span>{ingredientsNames[ingrKey]}</span>: {this.props.ingredients[ingrKey]}
            </li>
          );
        }
        return li;
      });
    return (
      <Aux>
        <h3>Ваш заказ</h3>
        <p>Аппетитный бутерброд со следующими ингредиентами: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Итого: {this.props.price.toFixed(2)} руб.</strong></p>
        <p>Продолжить?</p>
        <Button type="button" btnType="Danger" clicked={this.props.purchaseCancelHandler} >ОТМЕНИТЬ</Button>
        <Button type="button" btnType="Success" clicked={this.props.purchaseContinueHandler} >ПРОДОЛЖИТЬ</Button>
      </Aux>
    );
  }
}


OrderSummary.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.object]).isRequired,
  purchaseCancelHandler: PropTypes.func.isRequired,
  purchaseContinueHandler: PropTypes.func.isRequired,
  price: PropTypes.number,
};

OrderSummary.defaultProps = {
  price: 0,
};

export default OrderSummary;
