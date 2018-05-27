/* Hight-Order Component
Просто вспомогаетльный компонет обертка. Возвращает переданный ему компонент.
Используется там где хочется избежать лишних div'ов
*/
const aux = props => props.children;
export default aux;
