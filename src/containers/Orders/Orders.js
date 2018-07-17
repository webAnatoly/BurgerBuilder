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
    this.props.onFetchOrders();
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
};

// Orders.defaultProps = {

// };

const mapStateToProps = state => (
  {
    arrayOfAllOrders: state.order.orders,
    noOrders: state.order.noOrders,
    loading: state.order.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrders));
