import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux/Aux';
import s from './Cross.css';

const Cross = props => (
  <Aux>
    <div
      className={s.Cross}
      onClick={props.clicked}
      onKeyDown={() => null}
      role="button"
      tabIndex="0"
    >
      &#10006;
    </div>
  </Aux>
);

Cross.propTypes = {
  clicked: PropTypes.func,
};

Cross.defaultProps = {
  clicked: () => null,
};

export default Cross;
