// Языковой файл, который планирую использовать,
// когда буду реализовывать переключения между языками интерфейса

const languagePackage = {
  ingredientsNames: {
    salad: 'салат',
    cheese: 'сыр',
    meat: 'мясо',
    bacon: 'бекон',
  },
  ingrediets: 'Ингредиенты',
  noAddedIngredients: 'Ингредиенты не добавлены',
  BeginAddIngredients: 'Начните добавлять ингредиенты',
  price: 'Цена',
  order: ['Сделать заказ', 'Заказы', 'Ваш заказ'],
  less: 'Меньше',
  greater: 'Больше',
  currency: ['р', 'руб', 'рубль', 'рублей'],
  niceBurder: ['Аппетитный бутерброд со следующими ингредиентами', 'Выглядит аппетитно'],
  total: 'Итого',
  continue: 'Продолжить',
  cancel: 'Отменить',
};

const contactsForm = {
  enterYourContacts: 'Введите Ваши контактные данные',
  name: 'Имя',
  email: 'Емейл',
  street: 'Улица',
  postCode: 'Почтовый индекс',
};

export { languagePackage as lang, contactsForm };
