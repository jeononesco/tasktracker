import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FunctionComponent, ReactNode } from 'react';
import styles from './modal.module.scss';

export const default_modal_style = {
  position: 'absolute' as 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const default_modal_style_scss = styles['default-modal-style'];

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
