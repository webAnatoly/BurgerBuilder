import React from 'react';
import PropTypes from 'prop-types';
import axiosOrders from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import s from './ContactData.css';

const createInputTemplate = (elementType, type, placeholder, value) => {
  /* Функция создает и возвращает объект,
  который будет использоваться в качестве шаблона для создания инпутов в форме */
  const result = {
    elementType: elementType || 'input',
    elementConfig: {
      type: type || 'text',
      placeholder: placeholder || '',
    },
    value: value || '',
  };
  return result;
};

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: createInputTemplate('input', 'text', 'Ваше имя', ''),
        street: createInputTemplate('input', 'text', 'Адрес', ''),
        zipCode: createInputTemplate('input', 'text', 'Почтовый индекс', ''),
        country: createInputTemplate('input', 'text', 'Страна', ''),
        email: createInputTemplate('input', 'email', 'Ваш емейл', ''),
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Экспресс доставка' },
              { value: 'normal', displayValue: 'Обычная доставка' },
            ],
          },
          value: '',
        },
      },
      loading: false,
    };
  }

  orderHandler = (event) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы при нажатии кнопки в форме

    this.setState({ loading: true }); // активизируем показ спиннера
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // в реальном приложении цену надо считать на сервере
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
  inputChangedHandler = (event, inputIdentifier) => {
    // копируем orderForm
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  }
  render() {
    const formElementsArray = [];
    // Заполняем массив объектами-шаблонами на основе которых будут созданы инпуты в форме
    Object.entries(this.state.orderForm).forEach((elem) => {
      formElementsArray.push({
        id: elem[0],
        ...elem[1],
      });
    });

    let form = (
      <form onSubmit={e => e.preventDefault()}>
        {/* Создаём инпуты на основе массива объектов-шаблонов */}
        {formElementsArray.map(formElement => (
          <Input
            /* Изначально в качестве key у меня было рандомное значение key={randomKey()},
            но это приводило к тому что при ререндинге терялся фокус в input'e.
            Чтобы этого избежать, нужно в качестве key выбирать какое-то постоянное значение,
            которое не меняется при перерендинге. */
            key={formElement.id}
            inputType={formElement.elementType}
            elementConfig={formElement.elementConfig}
            value={formElement.value}
            id={formElement.id}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />))}
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
