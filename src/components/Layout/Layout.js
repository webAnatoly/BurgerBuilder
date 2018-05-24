import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import s from './Layout.css';

const layout = props => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={s.content}>
      {props.children}
    </main>
  </Aux>
);

layout.propTypes = {
  children: PropTypes.node,
};

layout.defaultProps = {
  children: '',
};

export default layout;
