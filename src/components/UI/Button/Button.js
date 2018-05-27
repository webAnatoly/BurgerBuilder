import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const Button = props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  clicked: PropTypes.func,
  btnType: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  clicked: () => null,
  btnType: '',
};

export default Button;
