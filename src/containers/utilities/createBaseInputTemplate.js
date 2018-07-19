/* Вспомогательная функция, которая создает и возвращает объект,
который будет использоваться для создания объекта конфигурации.
На основе объекта конфигурации будут создаваться разные инпуты в форме.
Эту функцию создал, чтобы не дублировать повторяющиеся свойства объекта конфигурации.
*/
const createBaseInputTemplate = (elementType, type, placeholder, validation) => {
  const result = {
    elementType: elementType || 'input',
    elementConfig: {
      type: type || 'text',
      placeholder: placeholder || '',
    },
    validation: { // default rules of validation
      required: validation === true || false,
    },
    valid: false,
    touched: false, // флаг для определения был ли ввод в поле от пользователя
  };
  return result;
};

export default createBaseInputTemplate;
