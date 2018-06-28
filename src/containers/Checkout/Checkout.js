import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  // updateIngredients(ingredientsFromDidMount, price) {
  //   this.setState({ ingredients: ingredientsFromDidMount, totalPrice: price });
  // }
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
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}


Checkout.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  ings: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = state => ({
  ings: state.ingredients,
});

/* С помощью функции connect() cвязываю компонент Checkout c redux.
Здесь не использую mapDispatchToProps потому что не собираюсь ничего менять в глобальном сторе.
Хочу лишь получать данные из него поэтому использую только mapStateToProps */

export default connect(mapStateToProps)(Checkout);
