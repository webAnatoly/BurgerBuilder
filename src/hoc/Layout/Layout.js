import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import s from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  }

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          sideDrawerToggleHandler={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={s.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  // isAuthenticate это свойтво, говорящее о том авторизирован ли юзер или нет.
  isAuthenticated: state.auth.token !== null,
});

Layout.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
};

Layout.defaultProps = {
  children: '',
};

export default connect(mapStateToProps)(Layout);
