import React from 'react';
import PropTypes from 'prop-types';
import s from './NavigationItem.css';

const NavigationItem = props => (
  <li className={s.NavigationItem}>
    <a
      href={props.link}
      className={props.active ? s.active : null}
    >
      {props.children}
    </a>
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
