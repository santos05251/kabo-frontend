import React from "react";
import ReactModal from "react-modal";
import { ReactComponent as OrderEnvelope } from '../../assets/images/order-envelope.svg';
import { ReactComponent as Close } from '../../assets/images/close.svg';

ReactModal.setAppElement("#root");

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAppend, isLarge,isSmall } = this.props;
    return (
      <div className="">
        <ReactModal
          isOpen={this.props.isOpen}
          overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex justify-center global-modal-overlay items-start z-50 overflow-y-scroll"
          className={
            isLarge
              ? "w-full bg-white md:m-24 lg:rounded-xl shadow-modal outline-none"
              : `w-full ${isSmall ? 'max-w-23' : 'max-w-2xl' }  bg-white md:m-24 lg:rounded-xl shadow-modal outline-none`
          }
          onRequestClose={() => this.props.onRequestClose()}
        >
          <div className={`p-4  flex justify-between ${this.props.bgColor ? this.props.bgColor : ''}`}>
            <h3 className="text-xl flex items-center font-bold font-messina">
              {this.props.isOrderLogo? <OrderEnvelope className="mr-4"/> : null}
              {this.props.title}
            </h3>
            <a href="#close-modal" className={`${this.props.bgColor ? 'close-icon' : ''}`} onClick={() => this.props.onRequestClose()}>
              {this.props.bgColor? null : <Close />}
            </a>
          </div>
          <div>{this.props.children}</div>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;
