import Button from '@mui/material/Button';
import { Icons } from 'data/icons';
import { MouseEventHandler } from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  text: string;
  type: 'button' | 'reset' | 'submit' | undefined;
  size?: 'small' | 'medium' | 'large';
  icon?: ['start' | 'end', string];
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

export const ButtonControl: React.FC<ButtonProps> = ({
  text,
  size = 'medium',
  icon,
  variant = 'contained',
  disabled = false,
  type = 'button',
  onClick,
}) => {
  let starticon, endicon;
  if (icon) {
    const [position, icon_object] = icon;

    if (position === 'start') {
      starticon = Icons[icon_object];
    } else {
      endicon = Icons[icon_object];
    }
  }
  return (
    <Button
      size={size}
      type={type}
      variant={variant}
      startIcon={starticon}
      endIcon={endicon}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
