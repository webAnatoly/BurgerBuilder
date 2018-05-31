import React from 'react';
// import PropTypes from 'prop-types';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axiosOrders, className) => (
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };

      /* axiosOrders.interceptors.request.use()
      will be called before the child components are rendered and
      we're not causing side effects here.
      We're just registering the interceptors and
      we want to do that before the child components are rendered. */
      this.requestInterceptorId = axiosOrders.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.responseInterceptorId = axiosOrders.interceptors.response.use(res => res, (err) => {
        this.setState({ error: err });
        return Promise.reject(err);
      });
    }
    componentWillUnmount() {
      // removing interceptors
      axiosOrders.interceptors.request.eject(this.requestInterceptorId);
      axiosOrders.interceptors.response.eject(this.responseInterceptorId);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }
    render() {
      return (
        <div className={className} >
          <Aux>
            <Modal show={!!this.state.error} modalClosed={this.errorConfirmedHandler}>
              <div>
                <p>Что-то пошло не так!</p>
                <p style={{ color: '#ff6666' }}>{this.state.error ? this.state.error.message : null}</p>
              </div>
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
        </div >
      );
    }
  }
);

// withErrorHandler.propTypes = {

// };

// withErrorHandler.defaultProps = {

// };

export default withErrorHandler;
