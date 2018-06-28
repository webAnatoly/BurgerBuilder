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

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 10,
  meat: 19,
  bacon: 15,
};

class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      purchasable: false,
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
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) { return; }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    /* Помещаем наши игридиенты в query параметры для URL.
    the query string of URL будем парсить в компоненте Checkout. */
    const queryParams = [];
    const ingredientPairs = Object.entries(this.state.ingredients);
    for (let i = 0; i < ingredientPairs.length; i += 1) {
      queryParams.push(`${encodeURIComponent(ingredientPairs[i][0])}=${encodeURIComponent(ingredientPairs[i][1])}`);
    }
    queryParams.push(`price=${this.state.totalPrice}`);// передаём totalPice посредством query в компонент Checkout
    // перенаправляет на "страницу" Checkout
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryParams.join('&')}`, // тут query string которую мы сформировали на основе this.state.ingredients
    });
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
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={this.state.totalPrice}
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
  ings: PropTypes.string,
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
};

BurgerBuilder.defaultProps = {
  ings: '',
};

const mapStateToProps = state => ({
  ings: state.ingredients,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  }),
  onIngredientRemoved: ingName => dispatch({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  }),
});

export default
connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));
