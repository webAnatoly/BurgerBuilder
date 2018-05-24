import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.css';

const Modal = props => (
  // props.children can be anything: plain text, another component, etc.
  <div className={s.Modal}>
    {props.children}
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
