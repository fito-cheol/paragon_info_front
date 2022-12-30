import React, { useMemo } from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import heroList from 'assets/hero/DB_Hero.json';

interface Props {
  value: AutocompleteOption | null;
  onChange?: (heroInfo: AutocompleteOption | null) => void;
}

interface AutocompleteOption {
  label: string;
  id: string;
}

export default function autocompleteHero({ value, onChange }: Props) {
  const heroNameList = useMemo(() => {
    return heroList.map(heroInfo => {
      return { label: heroInfo['이름'], id: heroInfo.name };
    });
  }, []);

  return (
    <Autocomplete
      disablePortal
      id='combo-box'
      options={heroNameList}
      sx={{ width: 300 }}
      value={value}
      onChange={(event: any, newValue: AutocompleteOption | null) => {
        if (onChange) {
          if (newValue) {
            onChange(newValue);
          } else {
            onChange(null);
          }
        }
      }}
      renderInput={params => <TextField {...params} label='영웅을 선택하세요' />}
    />
  );
}
