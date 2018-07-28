import _ from 'lodash';
/* Вспомогательная функция для наших redusers
Аргументы:
oldObject - объект который нужно обновить
newProperties - новые свойства, которые мы хотим добавить или переписать

Функция на основе oldObject, создает новый объект, копируя все свойства из oldObject в новый объект
и добавдяет в новый объект новые свойства из параметра newProperties.

Возвращает новый объект.
*/
const updateObject = (oldObject, newProperties) => {
  /*
  Теоретически oldObject может быть любой глубины вложенности, т.е. содержать другие объекты,
  которые содержать в себе другие объекты и т.д.
  Поэтому для надежного копирования я решил использовать функцию _cloneDeep из библиотеки lodash
  потому что она рекурсивно копирует объект любой глубины вложенности.
  */
  const newObject = _.cloneDeep(oldObject);
  return {
    ...newObject,
    ...newProperties,
  };
};

export default updateObject;