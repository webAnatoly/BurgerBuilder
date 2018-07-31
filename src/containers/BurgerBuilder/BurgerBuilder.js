import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Cross from '../../components/UI/Cross/Cross';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosOrders from '../../axios-orders';
import * as actions from '../../store/actions/index';

/* export здесь только для того, чтобы была возможность импортировать этот компонет
в файле BurgerBuilder.test.js для целей тестирования */
export class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
    this.props.onInitPurchase(); // диспатчим поле редакса purchased равным false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingred => ingredients[ingred])
      .reduce((accum, currentValue) => accum + currentValue, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      /* Если не зарегистрированный пользователя добавил ингредиенты и кликнул "сделать заказ",
      путь устанавливаем '/checkout', и перенаправляем его на страницу авторизации.
      Ингредиенты которые он добавил сохранены в редаксовском сторе, поэтому после его авторизации,
      можно будет продолжит оформлять заказ.
      И после того как он авторизируется он будет перенаправлен не на главную, а не /checkut */
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    /* Теперь, когда использую Redux можно получать список ингредиентов из глобального store
    и соответственно отпала необходимость передавать список ингредиентов в строке URL.
    */
    this.props.onInitPurchase(); // диспатчим поле редакса purchased равным false
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    Object.keys(disabledInfo).forEach((key) => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });
    let orderSummary = null;
    let burger = this.props.loadingError ? <p>Ингредиенты не могут быть загружены</p> : <Spinner />;
    if (Object.keys(this.props.ings).length > 0) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            price={this.props.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          showSpinner={this.state.loading}
          clicked={this.purchaseHandler}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
          <Cross clicked={this.purchaseCancelHandler} />
        </Modal>
        {burger}
      </Aux>
    );
  }
}

BurgerBuilder.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  ings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
  onInitIngredients: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  loadingError: PropTypes.bool.isRequired,
  onInitPurchase: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
};

BurgerBuilder.defaultProps = {
  isAuthenticated: null,
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice, // почему-то цена не уменьшается
  loadingError: state.burgerBuilder.loadingError,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
});

export default
connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));
