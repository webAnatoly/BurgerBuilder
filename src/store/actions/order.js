import * as actionTypes from './actionTypes';
import axiosOrders from '../../axios-orders';

export const purchaseBurgerSuccess = (id, dataOfOrder) => (
  {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: dataOfOrder,
  }
);

export const purchaseBurgerFall = err => (
  {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err,
  }
);

const purchaseBurgerStart = () => (
  {
    type: actionTypes.PURCHASE_BURGER_START,
  }
);

export const purchaseBurger = orderData => (
  (dispatch) => {
    dispatch(purchaseBurgerStart());
    axiosOrders.post('/orders.json', orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        // response.data.name это уникальный ключ, возвращаемый Firebase в случае успешной записи.
        // A successful request is indicated by a 200 OK HTTP status code.
        // The response contains the child name of the new data specified in the POST request.
        // See Firebase Database REST API https://firebase.google.com/docs/reference/rest/database/#section-post
      })
      .catch((err) => {
        console.log(err);
        dispatch(purchaseBurgerFall(err));
      });
  }
);
