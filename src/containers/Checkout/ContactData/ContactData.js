import React from 'react';
import PropTypes from 'prop-types';
import axiosOrders from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import s from './ContactData.css';

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
      loading: false,
    };
  }
  orderHandler = (event) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы при нажатии кнопки в форме

    this.setState({ loading: true }); // активизируем показ спиннера
    const order = {
      ingrediets: this.props.ingredients,
      price: this.props.price, // в реальном приложении цену надо считать на сервере
      customer: {
        name: 'Anatoly',
        address: {
          street: 'TestStree 14',
          zipCode: '12341234',
          country: 'Russian',
        },
        email: 'mail@mail.com',
      },
      deliveryMethod: 'fastest',
    };
    axiosOrders.post('/orders.json', order)
      .then(() => {
        // перестаём показывать спиннер
        this.setState({ loading: false });
        // перенапрвляем пока что на главную страницу
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }
  render() {
    let form = (
      <form>
        <input className={s.Input} type="text" name="name" placeholder="Имя" />
        <input className={s.Input} type="email" name="email" placeholder="Емейл" />
        <input className={s.Input} type="text" name="street" placeholder="Улица" />
        <input className={s.Input} type="text" name="postal" placeholder="Почтовый индекс" />
        <Button btnType="Success" clicked={this.orderHandler}>ЗАКАЗАТЬ</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={s.ContactData}>
        <h4>Введите Ваши контактные данные</h4>
        {form}
      </div>
    );
  }
}


ContactData.propTypes = {
  ingredients: PropTypes.oneOfType([PropTypes.object]),
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  price: PropTypes.number,
};

ContactData.defaultProps = {
  ingredients: {},
  price: 0,
};

export default ContactData;
