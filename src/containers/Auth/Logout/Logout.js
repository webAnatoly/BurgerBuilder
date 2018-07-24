/* Основная функция этого компонента диспатчить экшет logout и
редиректить на главную "страницу"
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // будем редиректить на главную "страницу"

import * as actions from '../../../store/actions/index';

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogOut();
  }
  render() {
    return (
      <Redirect to="/" />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(actions.logout()),
});

Logout.propTypes = {
  onLogOut: PropTypes.func.isRequired,
};

// Logout.defaultProps = {

// };

export default connect(null, mapDispatchToProps)(Logout);
