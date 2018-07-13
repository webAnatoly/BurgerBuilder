import * as actionTypes from '../actions/actionTypes';

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
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          /* В action.ingredients будут попадать данные с сервера.
          Запрос на сервер будет делаться в Action Creatore, burgerBuilder -> initIngredients() */
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        loadingError: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        loadingError: true,
      };
    default:
      return state;
  }
};

export default reducer;
