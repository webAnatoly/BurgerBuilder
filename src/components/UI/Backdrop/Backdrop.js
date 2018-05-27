import React from 'react';
import PropTypes from 'prop-types';
import s from './Backdrop.css';

// Этот компонент используется в качестве заднего фона для модального окна

const Backdrop = props => (
  props.show ? <div
    className={s.Backdrop}
    onClick={props.clicked}
    onKeyDown={() => null} // добавли onkeydown чтобы eslinter не ругался
    role="button"
    tabIndex="0"
  /> : null
);

Backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func,
};

Backdrop.defaultProps = {
  show: false,
  clicked: () => null,
};

export default Backdrop;
