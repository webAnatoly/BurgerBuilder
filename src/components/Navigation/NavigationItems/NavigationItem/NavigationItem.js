import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import s from './NavigationItem.css';

const NavigationItem = props => (
  <li className={s.NavigationItem}>
    {/* Если exact = true значит ссылка активна.
    When true, the active class/style will only be applied if the location is matched exactly. */}
    <NavLink
      to={props.link}
      activeClassName={s.active}
      exact={props.exact}
      onClick={props.closed}
    >
      {props.children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  children: PropTypes.node,
  link: PropTypes.string,
  exact: PropTypes.bool,
  closed: PropTypes.func.isRequired,
};

NavigationItem.defaultProps = {
  children: null,
  link: '/',
  exact: false,
};

export default NavigationItem;
