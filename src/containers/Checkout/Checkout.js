import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {},
      totalPrice: 0,
    };
  }
  componentWillMount() {
    /* Парсим the query string of a URL.
    Query string мы сформировали в компоненте BurgerBuilder и благодаря реакт-роутеру,
    имеем доступ к этой строке в этом компоненте, через this.props.location.search */
    const query = new URLSearchParams(this.props.location.search);
    const ingredientsFromQueryString = {}; // сюда складываем распарсенные ингредиенты
    let price = 0;
    query.forEach((howMuch, ingredientName) => {
      if (ingredientName === 'price') { // кроме ингридиентов из компонента BurgerBuleder так же передаём цену бутерброда
        price = howMuch;
      } else {
        ingredientsFromQueryString[ingredientName] = howMuch;
      }
    });
    if (Object.keys(ingredientsFromQueryString).length > 0) { // проверка на пустоту объекта
      this.updateIngredients(ingredientsFromQueryString, price);
    }
  }
  updateIngredients(ingredientsFromDidMount, price) {
    this.setState({ ingredients: ingredientsFromDidMount, totalPrice: price });
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
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={parseInt(this.state.totalPrice, 10)}
              {...props} // прокидываем нативные свойства роутера такие как history, match, location
            />
          )}
        />
      </div>
    );
  }
}


Checkout.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]),
};

Checkout.defaultProps = {
  location: {},
};

export default Checkout;
