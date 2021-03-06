import React from 'react';
import TypeProps from 'prop-types';
import s from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import getRandomUniqueKey from '../../share/getUniqueRandomNumber';

const burger = (props) => {
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
    if (props.checkoutHaveIngredients) {
      arrayIngredients = <p>Ингредиенты не добавлены</p>;
    } else {
      arrayIngredients = <p>Начните добавлять ингредиенты</p>;
    }
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
  checkoutHaveIngredients: TypeProps.bool,
};

burger.defaultProps = {
  ingredients: {},
  checkoutHaveIngredients: false,
};

export default burger;
