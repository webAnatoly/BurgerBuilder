import React from 'react';
import PropTypes from 'prop-types';
import s from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
  <ul className={s.NavigationItems}>
    <NavigationItem link="/" exact>Наполнить бутерброд</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Заказы</NavigationItem> : null}
    {props.isAuthenticated
      ? <NavigationItem link="/logout">Выйти</NavigationItem>
      : <NavigationItem link="/auth">Авторизация</NavigationItem>}
    {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
  </ul>
);

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

// NavigationItems.defaultProps = {

// };

export default NavigationItems;
