import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../myLib/updateObject';

const initialState = {
  ingredients: {},
  totalPrice: 0,
  loadingError: false,
  building: false, // если начали строить бутерброд, то меняем на true
};

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 10,
  meat: 19,
  bacon: 15,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => (updateObject(state, {
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
  building: false,
}));

const fetchIngredientsFailed = state => (updateObject(state, { loading: true }));

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
    default: return state;
  }
};

export default reducer;
