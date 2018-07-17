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

export const purchaseInit = () => (// редирект после отправки формы
  {
    type: actionTypes.PURCHASE_INIT,
  }
);

/* Action Creators для получения всех orders с сервера */
export const fetchOrdersSuccess = fetchedOrders => (
  {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: fetchedOrders,
  }
);

export const fetchOrdersFail = err => (
  {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err,
  }
);

export const fetchOrdersStart = () => (
  {
    type: actionTypes.FETCH_ORDERS_START,
  }
);

export const fetchOrders = () => (
  (dispatch) => {
    dispatch(fetchOrdersStart());
    axiosOrders.get('/orders.json')
      .then((response) => {
        // если response.data существует и он не пустой
        if (response.data && Object.keys(response.data).length !== 0) {
          const allFetchedOrders = Object.entries(response.data).map(order => (
            { ...order[1], id: order[0] }
          ));
          dispatch(fetchOrdersSuccess(allFetchedOrders));
        } else {
          // если что-то пошло не так, просто диспатчим пустой массив.
          dispatch(fetchOrdersSuccess([]));
        }
      })
      .catch((err) => {
        console.log('[!!! Catched error !!!]', err);
        dispatch(fetchOrdersFail(err));
      });
  }
);
