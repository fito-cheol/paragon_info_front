import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
  children: ReactNode;
};

export default function ColoredButton({ children }: ButtonProps) {
  return (
    <Button
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        borderRadius: 1,
        cursor: 'pointer',
        fontSize: 24,
        fontWeight: 700,
      }}
    >
      {children}
    </Button>
  );
}
