/* Вспомогательная функция для наших redusers
Аргументы:
oldObject - объект который нужно обновить
newProperties - новые свойства, которые мы хотим добавить или переписать

Функция на основе oldObject, создает новый объект, копируя все свойства из oldObject в новый объект
и добавдяет в новый объект новые свойства из параметра newProperties.

Возвращает новый объект.
*/
const updateObject = (oldObject, newProperties) => (
  {
    ...oldObject,
    ...newProperties,
  }
);

export default updateObject;
