import React from 'react';
import PropTypes from 'prop-types';
import axiosOrders from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import s from './ContactData.css';

const createBaseInputTemplate = (elementType, type, placeholder, validation) => {
  /* Вспомогательная функция, которая создает и возвращает объект,
  который будет использоваться для создания объекта конфигурации.
  На основе объекта конфигурации будут создаваться разные инпуты в форме.
  Эту функцию создал, чтобы не дублировать повторяющиеся свойства объекта конфигурации.
  */
  const result = {
    elementType: elementType || 'input',
    elementConfig: {
      type: type || 'text',
      placeholder: placeholder || '',
    },
    validation: { // default rules of validation
      required: validation === true || false,
    },
    valid: false,
    touched: false, // флаг для определения был ли ввод в поле от пользователя
  };
  return result;
};

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Ключи объекта orderForm содержат объекты конфигурации
      для создания инпутов в компоненте <Input /> */
      orderForm: {
        name: { ...createBaseInputTemplate('input', 'text', 'Ваше имя', true), value: '' },
        street: { ...createBaseInputTemplate('input', 'text', 'Адрес', true), value: '' },
        zipCode: {
          ...createBaseInputTemplate('input', 'text', 'Почтовый индекс', true),
          value: '',
          validation: { // rules of validation
            required: true,
            minLength: 3,
            maxLength: 3,
          },
        },
        country: { ...createBaseInputTemplate('input', 'text', 'Страна', true), value: '' },
        email: { ...createBaseInputTemplate('input', 'email', 'Ваш емейл', true), value: '' },
        deliveryMethod: {
          ...createBaseInputTemplate('select', '', '', false),
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Экспресс доставка' },
              { value: 'normal', displayValue: 'Обычная доставка' },
            ],
          },
          value: '',
          valid: true,
          defaultValueForSelect: 'normal',
        },
        /* Tеперь, при необходимости, можно будет легко добавлять дополнительные поля в форму
        просто добавив новое поле с конфигурацией. Например вот так:
        name2: { ...createBaseInputTemplate('input', 'text', 'Ваше имя2'), value: '' }, */
      },
      loading: false,
      formIsValid: false, // на основе этого флага, разрешаем отправку формы
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
  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }
      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }
      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }
    }

    return isValid;
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
    updatedFormElement.valid =
      this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    /* Пройти по всем элементам формы и проверить, Валидность введенных данных.
    Если хотябы одно не валидно, то formIsValid установить false
    На основе свойства formIsValid будем разрешать/запрещать отправку формы
    */
    let isAllInputsValid = true;
    const arrayOfInputs = Object.entries(updatedOrderForm);
    for (let i = 0; i < arrayOfInputs.length; i += 1) {
      if (!arrayOfInputs[i][1].valid) {
        isAllInputsValid = false;
        // если хоть один input false, то следующие нет смысла проверять, поэтому выходим из цикла
        break;
      }
    }

    // обновляем state
    this.setState({ orderForm: updatedOrderForm, formIsValid: isAllInputsValid });
  }
  render() {
    const formElementsArray = [];
    // Заполняем массив объектами конфигурации на основе которых будут созданы инпуты в форме
    Object.entries(this.state.orderForm).forEach((elem) => {
      formElementsArray.push({
        id: elem[0],
        ...elem[1],
      });
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {/* Создаём инпуты на основе массива объектов-конфигурации */}
        {formElementsArray.map(formElement => (
          <Input
            /* Изначально в качестве key у меня было рандомное значение key={randomKey()},
            но это приводило к тому что при ререндинге терялся фокус в input'e.
            Чтобы этого избежать, нужно в качестве key выбирать какое-то постоянное значение,
            которое не меняется при ререндинге. */
            key={formElement.id}
            inputType={formElement.elementType}
            elementConfig={formElement.elementConfig}
            value={formElement.value}
            defaultValueForSelect={formElement.defaultValueForSelect}
            id={formElement.id}
            invalid={!formElement.valid}
            shouldValidate={!!formElement.validation}
            touched={formElement.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid} // disable is true if the form is not valid
        >
          ЗАКАЗАТЬ
        </Button>
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
