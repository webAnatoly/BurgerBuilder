import * as actionTypes from './actionTypes';
import axiosOrders from '../../axios-orders';

/* Action Creators */

export const addIngredient = name => (
  {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
);

export const removeIngredient = name => (
  {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  }
);

export const setIngredients = ingr => (
  {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingr,
  }
);

export const fetchIngredientsFailed = () => (
  {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
);

/* Этот Action Creator возвращает не объект, а функцию. Это возможно благодаря
подключенному middleware под названием redux-thunk. Зачем возвращать функцию?
Для того, чтобы иметь возможность отложить выполнения экшена и изменение стейта, до наступления
определённого события. В данном случае этим событием является получение ответа от сервера.
Вообще можно middleware и самому написать, но лучше взять готовое отсюда https://github.com/reduxjs/redux-thunk
что я и сделал. */
export const initIngredients = () => (
  (dispatch) => {
    axiosOrders.get('/ingredients.json')
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((err) => {
        console.log('error: ', err);
        dispatch(fetchIngredientsFailed());
      });
  }
);
