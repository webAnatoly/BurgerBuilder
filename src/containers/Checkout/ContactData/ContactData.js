import React from 'react';
// import PropTypes from 'prop-types';
import Button from '../../../components/UI/Button/Button';
import s from './ContactData.css';

class ContactData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
    };
  }
  render() {
    return (
      <div className={s.ContactData}>
        <h4>Введите Ваши контактные данные</h4>
        <form>
          <input className={s.Input} type="text" name="name" placeholder="Имя" />
          <input className={s.Input} type="email" name="email" placeholder="Емейл" />
          <input className={s.Input} type="text" name="street" placeholder="Улица" />
          <input className={s.Input} type="text" name="postal" placeholder="Почтовый индекс" />
          <Button btnType="Success">ЗАКАЗАТЬ</Button>
        </form>
      </div>
    );
  }
}


// ContactData.propTypes = {

// };

// ContactData.defaultProps = {

// };

export default ContactData;
