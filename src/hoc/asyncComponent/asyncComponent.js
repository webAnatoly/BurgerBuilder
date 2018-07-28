import React from 'react';
/* Hight Order Component для реализации динамической подгрузки компонентов
В качестве аргумента принимает анонимную функцию вида () => import('путь к компоненту')
*/
const asyncComponent = importComponent => (
  class extends React.Component {
    state = {
      component: null,
    }
    componentDidMount() {
      importComponent()
        .then((comp) => {
          /* For default exports, you need to know that default is a keyword.
          Using it as a property name via the dot notation is OK
          See more http://2ality.com/2017/01/import-operator.html */
          this.setState({ component: comp.default });
        });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
);

export default asyncComponent;
