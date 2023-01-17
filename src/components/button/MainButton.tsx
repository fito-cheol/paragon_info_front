import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function ColoredButton({ children, onClick }: ButtonProps) {
  return (
    <Button
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        borderRadius: 2,
        cursor: 'pointer',
        fontSize: 24,
        fontWeight: 700,
        ':hover': {
          backgroundColor: 'grey',
        },
      }}
      onClick={event => {
        if (onClick) onClick(event);
      }}
    >
      {children}
    </Button>
  );
}
