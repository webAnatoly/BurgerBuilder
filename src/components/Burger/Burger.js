import React from 'react';
import TypeProps from 'prop-types';
import { withRouter } from 'react-router-dom';
/* withRouter HOC для прокидывания свойств роутера match, location, and history
внутрь реактовских компонентов.
Именно здесь передаём свойства match, location, and history функциональному
компоненту burger
if you ever need direct access to match, history or any location
and you don't want to manually pass it on from the top level component
you can use "withRouter" HightOrderComponent. */
import s from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import getRandomUniqueKey from '../../myLib/getUniqueRandomNumber';

const burger = (props) => {
  console.log(props);
  let arrayIngredients = Object.keys(props.ingredients)
    .map((ingred) => {
      const amount = props.ingredients[ingred];
      const arrIngreds = [];
      for (let i = amount; i > 0; i -= 1) {
        arrIngreds.push(<BurgerIngredient type={ingred} key={getRandomUniqueKey()} />);
      }
      return [...arrIngreds];
    })
    .reduce((accumArr, el) => accumArr.concat(el), []); // делаем массив одномерным

  if (arrayIngredients.length === 0) {
    arrayIngredients = <p>Начните добавлять ингредиенты</p>;
  }

  return (
    <div className={s.Burger}>
      <BurgerIngredient type="bread-top" />
      {arrayIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: TypeProps.oneOfType([TypeProps.object]),
};

burger.defaultProps = {
  ingredients: {},
};

export default withRouter(burger);
