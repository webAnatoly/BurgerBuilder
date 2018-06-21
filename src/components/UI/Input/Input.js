import React from 'react';
import PropTypes from 'prop-types';
import randomKey from '../../../myLib/getUniqueRandomNumber';
import s from './Input.css';

const Input = (props) => {
  let inputElement = null;

  /* В этом компоненте в пропсах получаем объект,
  на основе которого конфигурируем и рендерим необходимый инпут елемент */

  switch (props.inputType) {
    case ('input'):
      inputElement = (<input
        {...props.elementConfig} // type, placeholder
        id={props.id}
        className={s.InputElement}
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
          defaultValue={props.elementConfig.options[0].value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={randomKey()}>
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
  label: PropTypes.string,
  changed: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  value: '',
  changed: () => null,
};

export default Input;
