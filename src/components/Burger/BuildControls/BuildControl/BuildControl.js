import React from 'react';
import PropTypes from 'prop-types';

import s from './BuildControl.css';

const buildControl = props => (
  <div className={s.BuildControl}>
    <div className={s.Label}>{props.label}</div>
    <button
      className={s.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Меньше
    </button>
    <button
      className={s.More}
      onClick={props.added}
    >
      Больше
    </button>
  </div>
);

buildControl.propTypes = {
  label: PropTypes.string,
  added: PropTypes.func,
  removed: PropTypes.func,
  disabled: PropTypes.bool,
};

buildControl.defaultProps = {
  label: '',
  added: () => null,
  removed: () => null,
  disabled: false,
};

export default buildControl;
