import React from 'react';

import MuiIconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

export const Root = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: 4,
  borderRadius: 40,
  border: '1px solid',
  borderColor: theme.palette.grey[300],
}));

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
  padding: 8,
  '& svg': {
    fontSize: 16,
  },
}));

export const ValueElement = styled('span')(({ theme }) => ({
  padding: '0px 8px',
}));

const DailyInteger = ({ children }) => {
  return (
    <Root>
      <IconButton>
        <Remove />
      </IconButton>
      <ValueElement>{children}</ValueElement>
      <IconButton>
        <Add />
      </IconButton>
    </Root>
  );
};

export default DailyInteger;
