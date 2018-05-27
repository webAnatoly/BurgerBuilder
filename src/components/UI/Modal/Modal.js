import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef(); /* Ссылка на модальное окно, что-бы можно было реализовать
    автофокус.
    Автофокус нужен, чтобы сработал обработчик нажатия клавиши "Escape" на модальном окне. */
  }

  shouldComponentUpdate(nextProps) {
    // Рендерим компонент только тогда, когда его нужно показать пользователю
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    if (this.props.show) {
      this.modalRef.current.focus(); // Автофокус на модальном окне во время его появления
    }
  }

  keyDownHandler = (event) => {
    if (event.key === 'Escape') {
      this.props.modalClosed();
    }
  }

  render() {
    return (
      // props.children can be anything: plain text, another component, etc.
      <Aux>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}
        />
        <div
          ref={this.modalRef}
          className={s.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
          onKeyDown={this.keyDownHandler}
          role="button"
          tabIndex="0"
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  modalClosed: PropTypes.func,
};

Modal.defaultProps = {
  children: null,
  show: false,
  modalClosed: () => false,
};

export default Modal;
