import React from 'react';
import PropTypes from 'prop-types';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {},
    };
  }
  componentDidMount() {
    /* Парсим the query string of a URL.
    Query string мы сформировали в компоненте BurgerBuilder и благодаря реакт-роутеру,
    имеем доступ к этой строке в этом компоненте, через this.props.location.search */
    const query = new URLSearchParams(this.props.location.search);
    const ingredientsFromQueryString = {}; // сюда складываем распарсенные ингредиенты
    query.forEach((howMuch, ingredientName) => {
      ingredientsFromQueryString[ingredientName] = howMuch;
    });
    if (Object.keys(ingredientsFromQueryString).length > 0) { // проверка на пустоту объекта
      this.updateIngredients(ingredientsFromQueryString);
    }
  }
  updateIngredients(ingredientsFromDidMount) {
    this.setState({ ingredients: ingredientsFromDidMount });
  }
  checkoutCancelledHandler = () => {
    /* Так как этот компонент загружается через Route компонент, то в пропсы попадают
    объекты math, locacion and history соответсвенно можно их тут использовать.
    Использует history.goBack() для возврата назад. */
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}


Checkout.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]),
};

Checkout.defaultProps = {
  location: {},
};

export default Checkout;
