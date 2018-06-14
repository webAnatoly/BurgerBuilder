import React from 'react';
// import PropTypes from 'prop-types';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Dummy ingredients just for test. Later will be replaced.
      ingredients: {
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1,
      },
    };
  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}


// Checkout.propTypes = {

// };

// Checkout.defaultProps = {

// };

export default Checkout;
