import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const Button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    type={props.type}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  clicked: PropTypes.func,
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

Button.defaultProps = {
  children: null,
  clicked: () => null,
  btnType: '',
  disabled: false,
};

export default Button;
