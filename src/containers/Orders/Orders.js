import React from 'react';
// import PropTypes from 'prop-types';
import axiosOrders from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfAllOrders: [],
      loading: true,
    };
    this.isMountedOrders = true; // Зачем это поле? Читай комментарий номер [1]
  }
  componentDidMount() {
    axiosOrders.get('/orders.json')
      .then((res) => {
        // если res.data существует и он не пустой
        if (res.data && Object.keys(res.data).length !== 0) {
          const allFetchedOrders = Object.entries(res.data).map(order => (
            { ...order[1], id: order[0] }
          ));
          if (this.isMountedOrders) { // меняем state только если компонент существует. [1]
            this.setState({ loading: false, arrayOfAllOrders: allFetchedOrders });
          }
        } else {
          // если res.data не существует или пуст значит нет ни одного заказа,
          this.setState({ loading: false, noOrders: true });
        }
      })
      .catch((err) => {
        console.log('[!!! Catched error !!!]', err);
        /* Устанавливаем свойство loading = false
        потому что загрузка, хоть и с ошибкой, но закончена */
        this.setState({ loading: false });
      });
  }
  componentWillUnmount() {
    this.isMountedOrders = false;
    /* Комментарий [1]
    Если асинхронный запрос на сервер завершится после того как компонент бедет удален из DOM, то
    функция this.setState() будет вызвана для несуществующего компонента.
    У тебя есть два путя этого избежать:
    Первый: отменять запрос когда компонент Unmount;
    Второй: перед вызовом setState() проверять существует ли компонент,
    для этго предется ввести дополнительное свойство, например this.isMountedOrders = true;
    и менять его на false, когда компонет willUnmoutnt.

    P.S. имя isMounted не стоит использовать, так как оно уже используется реактом.
    P.P.S Здесь я использую второй способ, потому что его легче реализовать.
    Но по эффективности я думаю второй лучше,
    потому что он сразу отменяет запрос на сервер, когда компонент Unmount */
  }
  render() {
    let orders = null;
    if (this.state.loading) {
      orders = <Spinner />; // в процессе загрузки показывать спиннер
    } else {
      if (this.state.arrayOfAllOrders.length > 0) {
        orders = (
          this.state.arrayOfAllOrders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />))
        );
      }
      if (this.state.noOrders) {
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


// Orders.propTypes = {

// };

// Orders.defaultProps = {

// };

export default withErrorHandler(Orders, axiosOrders);
