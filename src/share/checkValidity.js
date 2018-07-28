/* Функция валидации.
Принимает значение которое нужно проверить и правила валидации в виде объекта. */
export default (value, rules) => {
  let isValid = true;
  if (!rules) { return true; }

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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNaturalNumber) {
      isValid = /^\d+$/.test(value) && isValid;
    }
  }

  return isValid;
};