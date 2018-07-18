import React from 'react';
// import PropTypes from 'prop-types';
import s from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={s.NavigationItems}>
    <NavigationItem link="/" exact>Наполнить бутерброд</NavigationItem>
    <NavigationItem link="/orders">Заказы</NavigationItem>
    <NavigationItem link="/auth">Авторизация</NavigationItem>
    {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
  </ul>
);

// NavigationItems.propTypes = {

// };

// NavigationItems.defaultProps = {

// };

export default NavigationItems;
