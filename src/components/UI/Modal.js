import Classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";

const Backdrop = (props) => {
  return <div className={Classes.backdrop} onClick={props.onClose}/>;
};
const Modaloverlay = (props) => {
  return (
    <div className={Classes.modal}>
      <div className={Classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const Modal = (props) => {
  return (<Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<Modaloverlay>{props.children} </Modaloverlay>, portalElement)}
    </Fragment>
  );
};
export default Modal;
