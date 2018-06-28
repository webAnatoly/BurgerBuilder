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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
      loading: false,
      loadingError: false,
    };
  }

  // componentDidMount() {
  //   axiosOrders.get('/ingredients.json')
  //     .then((response) => {
  //       this.setState({ ingredients: response.data });
  //     })
  //     .catch((err) => {
  //       this.setState({ loadingError: { err } });
  //     });
  // }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingred => ingredients[ingred])
      .reduce((accum, currentValue) => accum + currentValue, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    /* Теперь, когда использую Redux можно получать список ингредиентов из глобального store
    и соответственно отпала необходимость передавать список ингредиентов в строке URL.
    */
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
    let burger = this.state.loadingError ? <p>Ингредиенты не могут быть загружены</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
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
    if (this.state.loading) {
      orderSummary = <Spinner />;
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
  totalPrice: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  ings: state.ingredients,
  totalPrice: state.totalPrice, // почему-то цена не уменьшается
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  }),
  onIngredientRemoved: ingName => dispatch({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  }),
});

export default
connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));
