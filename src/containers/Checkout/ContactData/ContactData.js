import React from 'react';
import PropTypes from 'prop-types';
import axiosOrders from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import s from './ContactData.css';

const createInputTemplate = (elementType, type, placeholder) => {
  /* Функция создает и возвращает объект,
  который будет использоваться в качестве шаблона для создания разных инпутов в форме */
  const result = {
    elementType: elementType || 'input',
    elementConfig: {
      type: type || 'text',
      placeholder: placeholder || '',
    },
  };
  return result;
};

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: { ...createInputTemplate('input', 'text', 'Ваше имя'), value: '' },
        street: { ...createInputTemplate('input', 'text', 'Адрес'), value: '' },
        zipCode: { ...createInputTemplate('input', 'text', 'Почтовый индекс'), value: '' },
        country: { ...createInputTemplate('input', 'text', 'Страна'), value: '' },
        email: { ...createInputTemplate('input', 'email', 'Ваш емейл'), value: '' },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Экспресс доставка' },
              { value: 'normal', displayValue: 'Обычная доставка' },
            ],
          },
          value: '',
          defaultValueForSelect: 'normal',
        },
        /* Tеперь, при необходимости, можно будет легко добавлять дополнительные поля в форму
        просто добавив новое поле с конфигурацией. Например вот так:
        name2: { ...createInputTemplate('input', 'text', 'Ваше имя2'), value: '' }, */
      },
      loading: false,
    };
  }

  orderHandler = (event) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы при нажатии кнопки в форме

    this.setState({ loading: true }); // активизируем показ спиннера

    // формируем данные для отправки на сервер
    const formData = {};
    Object.entries(this.state.orderForm).forEach((formElementIdentifier) => {
      formData[formElementIdentifier[0]] = formElementIdentifier[1].value;
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // в реальном приложении цену надо считать на сервере
      orderData: formData,
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
    // копируем в новый объект orderForm
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    // копируем в новый объект состояния для текущего инпута
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    // обновляем value для текущего инпута
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    // обновляем state
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
      <form onSubmit={this.orderHandler}>
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
            defaultValueForSelect={formElement.defaultValueForSelect}
            id={formElement.id}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />))}
        <Button btnType="Success">ЗАКАЗАТЬ</Button>
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
