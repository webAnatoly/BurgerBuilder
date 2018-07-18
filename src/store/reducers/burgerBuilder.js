import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  ingredients: {},
  totalPrice: 0,
  loadingError: false,
};

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 10,
  meat: 19,
  bacon: 15,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedState);
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedState);
    }
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          /* В action.ingredients будут попадать данные с сервера.
          Запрос на сервер будет делаться в Action Creatore, burgerBuilder -> initIngredients() */
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 0,
        loadingError: false,
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        loadingError: true,
      });
    default:
      return state;
  }
};

export default reducer;
