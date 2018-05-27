import React from 'react';
import PropTypes from 'prop-types';
import s from './DrawerToggle.css';

const DrawerToggle = props => (
  <div
    className={s.DrawerToggle}
    onClick={props.sideDrawerToggleHandler}
    role="button"
    tabIndex="0"
    onKeyDown={() => null}
  >
    <div />
    <div />
    <div />
  </div>
);

DrawerToggle.propTypes = {
  sideDrawerToggleHandler: PropTypes.func,
};

DrawerToggle.defaultProps = {
  sideDrawerToggleHandler: () => null,
};

export default DrawerToggle;
