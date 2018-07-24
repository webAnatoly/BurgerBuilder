import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axiosOrders from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = null;
    if (this.props.loading) {
      orders = <Spinner />; // в процессе загрузки показывать спиннер
    } else {
      if (this.props.arrayOfAllOrders.length > 0) {
        orders = (
          this.props.arrayOfAllOrders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />))
        );
      }
      if (this.props.arrayOfAllOrders.length === 0) {
        orders = <p>Заказов нет</p>;
      }
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}


Orders.propTypes = {
  onFetchOrders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  arrayOfAllOrders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  token: PropTypes.string,
};

Orders.defaultProps = {
  token: null,
};

const mapStateToProps = state => (
  {
    arrayOfAllOrders: state.order.orders,
    noOrders: state.order.noOrders,
    loading: state.order.loading,
    token: state.auth.token, // токен доступа для авторизированного пользователя.
  }
);

const mapDispatchToProps = dispatch => (
  {
    onFetchOrders: token => dispatch(actions.fetchOrders(token)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrders));
