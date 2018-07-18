import React from 'react';
// import PropTypes from 'prop-types';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
      },
    };
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
      <div>
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
