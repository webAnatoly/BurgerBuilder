import React from 'react';
import PropTypes from 'prop-types';
import s from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => (
  <header className={s.Toolbar}>
    <DrawerToggle sideDrawerToggleHandler={props.sideDrawerToggleHandler} />
    <div className={s.Logo}>
      <Logo />
    </div>
    <nav className={s.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

Toolbar.propTypes = {
  sideDrawerToggleHandler: PropTypes.func,
};

Toolbar.defaultProps = {
  sideDrawerToggleHandler: () => null,
};

export default Toolbar;
