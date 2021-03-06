import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import s from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import Cross from '../../UI/Cross/Cross';

const SideDrawer = (props) => {
  let cssClasses = [s.SideDrawer, s.Close];
  if (props.open) {
    cssClasses = [s.SideDrawer, s.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={cssClasses.join(' ')}>
        <Cross clicked={props.closed} />
        <div className={s.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} closed={props.closed} />
        </nav>
      </div>
    </Aux>
  );
};

SideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool,
  isAuth: PropTypes.bool.isRequired,
};

SideDrawer.defaultProps = {
  open: false,
};

export default SideDrawer;
