import React from 'react';
import PropTypes from 'prop-types';
import s from './Input.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [s.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    /* Если в инпут введено валидное значение, то в props.invalid должно передаваться true.
    Валидация реализовывается в вышестоящих Class Components,
    а сюда передается true или false в свойстве props.invalid
    */
    inputClasses.push(s.Invalid);
  }

  /* В этом компоненте в пропсах получаем объект,
  на основе которого конфигурируем и рендерим необходимый инпут елемент */
  switch (props.inputType) {
    case ('input'):
      inputElement = (<input
        {...props.elementConfig} // type, placeholder
        id={props.id}
        className={inputClasses.join(' ')}
        onChange={props.changed}
        value={props.value}
      />);
      break;
    case ('textarea'):
      inputElement = (<textarea
        {...props.elementConfig} // type, placeholder
        id={props.id}
        className={s.InputElement}
        onChange={props.changed}
        value={props.value}
      />);
      break;
    case ('select'):
      inputElement = (
        <select
          id={props.id}
          className={s.InputElement}
          defaultValue={props.defaultValueForSelect}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (<input className={s.InputElement} />);
  }

  return (
    <div className={s.Input}>
      <label htmlFor={props.id} className={s.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  elementConfig: PropTypes.oneOfType([PropTypes.object]).isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultValueForSelect: PropTypes.string,
  label: PropTypes.string,
  changed: PropTypes.func,
  invalid: PropTypes.bool.isRequired, // флаг говорящий о том валидный или не валидный был ввод.
  shouldValidate: PropTypes.bool.isRequired, // флаг определяющий нужно ли валидировать инпут.
  touched: PropTypes.bool.isRequired, // флаг определяющий был ли ввод в инпут.
};

Input.defaultProps = {
  label: '',
  value: '',
  defaultValueForSelect: '',
  changed: () => null,
};

export default Input;
