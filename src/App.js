import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            {/* <BurgerBuilder /> */}
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            {/* <Checkout /> Временно вставил сюда чтобы посмотреть что получилось */}
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}
