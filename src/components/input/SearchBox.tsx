import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchButton = styled('button')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  width: '70px',
  fontSize: '14px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  float: 'right',
  position: 'absolute',
  userSelect: 'none',
  '&:hover': {
    background: theme.palette.primary.light,
  },
  '&:active': {
    background: theme.palette.primary.dark,
  },
}));

interface Props {
  onEnter: (text: string) => void;
  onChange?: (text: string) => void;
}

export default function SearchBox({ onChange, onEnter }: Props) {
  const [text, setText] = useState<string>('');

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onEnter(text);
    }
  };
  const changeHandler = (text: string) => {
    setText(text);
    if (onChange) onChange(text);
  };

  return (
    <div style={{ textAlign: 'center', paddingRight: '80px' }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='제목 검색'
          value={text}
          onChange={e => changeHandler(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
          onKeyPress={handleOnKeyPress}
        />
        <SearchButton onClick={() => onEnter(text)}> 검색</SearchButton>
      </Search>
    </div>
  );
}
