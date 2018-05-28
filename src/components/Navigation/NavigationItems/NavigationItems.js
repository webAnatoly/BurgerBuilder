import React from 'react';
// import PropTypes from 'prop-types';
import s from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={s.NavigationItems}>
    <NavigationItem link="#" active>Burger Builder</NavigationItem>
    <NavigationItem link="#">Checkout</NavigationItem>
  </ul>
);

// NavigationItems.propTypes = {

// };

// NavigationItems.defaultProps = {

// };

export default NavigationItems;
