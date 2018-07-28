import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
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
    // Если объект this.props.ings пустой, то перенаправляюем на главную "страницу".
    let summary = <Redirect to="/" />;
    if (Object.keys(this.props.ings).length > 0) {
      /* Если поле редактовского стора this.props.purchased === true это значит,
      что данные о составе заказа и содержание формы успешно отправлены на сервер.
      После успешной отправки данных, задиспатчится соответствующий экшен и
      как следствие перезапустится функция render() этого компонента,
      и так как purchased === true то произойдет редирект.
      А вот в том компоненте куда произошел редирект, нужно purchased снова установить в false */
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
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
    return summary;
  }
}


Checkout.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  ings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  purchased: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

/* С помощью функции connect() cвязываю компонент Checkout c redux.
Здесь не использую mapDispatchToProps потому что не собираюсь ничего менять в глобальном сторе.
Хочу лишь получать данные из него поэтому использую только mapStateToProps */

export default connect(mapStateToProps)(Checkout);
