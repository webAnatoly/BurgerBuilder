import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import s from './NavigationItem.css';

const NavigationItem = props => (
  <li className={s.NavigationItem}>
    <NavLink
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  children: PropTypes.node,
  link: PropTypes.string,
  active: PropTypes.bool,
};

NavigationItem.defaultProps = {
  children: null,
  link: '/',
  active: false,
};

export default NavigationItem;
