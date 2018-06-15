import React from 'react';
// import PropTypes from 'prop-types';

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
      <div>
        <h4>Введите Ваши контактные данные</h4>
        <form>
          <input type="text" name="name" placeholder="Имя" />
          <input type="email" name="email" placeholder="email" />
          <input type="text" name="street" placeholder="Улица" />
          <input type="text" name="postal" placeholder="Почтовый индекс" />
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
