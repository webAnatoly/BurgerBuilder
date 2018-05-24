import React from 'react';
import PropTypes from 'prop-types';
import s from './BurgerIngredient.css';

class BurgerIngredient extends React.Component {
  render() {
    let ingredient = null;
    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = <div className={s.BreadBottom} />;
        break;
      case 'bread-top':
        ingredient = (
          <div className={s.BreadTop}>
            <div className={s.Seeds1} />
            <div className={s.Seeds2} />
          </div>
        );
        break;
      case 'meat':
        ingredient = <div className={s.Meat} />;
        break;
      case 'cheese':
        ingredient = <div className={s.Cheese} />;
        break;
      case 'salad':
        ingredient = <div className={s.Salad} />;
        break;
      case 'bacon':
        ingredient = <div className={s.Bacon} />;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
