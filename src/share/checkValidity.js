/* Функция валидации.
Принимает значение которое нужно проверить и правила валидации в виде объекта. */
export default (value, rules) => {
  let isValid = true;

  if (rules) {
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
  }

  return isValid;
};
