/* Компонет Auth.js это форма авторизации пользователя */

import React from 'react';
// import PropTypes from 'prop-types';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import s from './Auth.css';
import createBaseInputTemplate from '../utilities/createBaseInputTemplate';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          ...createBaseInputTemplate('input', 'email', 'Емейл'),
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
        },
        password: {
          ...createBaseInputTemplate('input', 'password', 'Пароль'),
          elementType: 'input',
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
    };
  }
  render() {
    const formElementsArray = [];
    // Заполняем массив объектами конфигурации на основе которых будут созданы инпуты в форме
    Object.entries(this.state.controls).forEach((elem) => {
      formElementsArray.push({
        id: elem[0],
        ...elem[1],
      });
    });

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        inputType={formElement.elementType}
        elementConfig={formElement.elementConfig}
        value={formElement.value}
        id={formElement.id}
        invalid={!formElement.valid}
        shouldValidate={!!formElement.validation}
        touched={formElement.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div className={s.Auth}>
        <form>
          {form}
          <Button
            btnType="Success"
          >
            Подтвердить
          </Button>
        </form>
      </div>
    );
  }
}


// Auth.propTypes = {

// };

// Auth.defaultProps = {

// };

export default Auth;
