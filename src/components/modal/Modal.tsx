import Modal from '@mui/material/Modal';
import { FunctionComponent } from 'react';
import styles from './modal.module.scss';

export const modal_style = styles['modal-style'];

type modalFields = {
  open: boolean;
  handleClose: any;
  className?: any;
  children: React.ReactNode;
};

const ModalControl: FunctionComponent<modalFields> = props => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={props.className}
    >
      <>{props.children}</>
    </Modal>
  );
};

export default ModalControl;
