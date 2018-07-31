import React from 'react';
import PropTypes from 'prop-types';
import s from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
  <ul className={s.NavigationItems}>
    <NavigationItem link="/" exact closed={props.closed}>Наполнить бутерброд</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders" closed={props.closed}>Заказы</NavigationItem> : null}
    {props.isAuthenticated
      ? <NavigationItem link="/logout" closed={props.closed}>Выйти</NavigationItem>
      : <NavigationItem link="/auth" closed={props.closed}>Авторизация</NavigationItem>}
  </ul>
);

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  closed: PropTypes.func, // закрытие бокового меню
};

NavigationItems.defaultProps = {
  closed: () => null,
};

export default NavigationItems;
