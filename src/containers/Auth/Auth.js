/* Компонет Auth.js это форма авторизации пользователя */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import s from './Auth.css';
import createBaseInputTemplate from '../utilities/createBaseInputTemplate';
import * as actions from '../../store/actions/index';

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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true, // флаг для определения был ли ввод в поле от пользователя
      },
    };
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
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
        <form onSubmit={this.submitHandler}>
          {form}
          <Button
            type="submit"
            btnType="Success"
          >
            Подтвердить
          </Button>
        </form>
      </div>
    );
  }
}


Auth.propTypes = {
  onAuth: PropTypes.func.isRequired,
};

// Auth.defaultProps = {

// };

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.auth(email, password)),
});

export default connect(null, mapDispatchToProps)(Auth);
