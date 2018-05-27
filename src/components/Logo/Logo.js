import React from 'react';
// import PropTypes from 'prop-types';
import burgerLogo from '../../assets/images/logo.png';
import s from './Logo.css';

const Logo = () => (
  <div className={s.Logo}>
    <img src={burgerLogo} alt="" />
  </div>
);

// Logo.propTypes = {

// };

// Logo.defaultProps = {

// };

export default Logo;
