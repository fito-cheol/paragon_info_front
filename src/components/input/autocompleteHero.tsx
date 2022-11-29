import React, { useMemo } from 'react';
import EditorWrite from '../../components/post/EditorWrite';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import heroList from '../../assets/hero/DB_Hero.json';

export default function autocompleteHero() {
  const [value, setValue] = React.useState<string | null>(null);
  const heroNameList = useMemo(() => {
    return heroList.map(heroInfo => heroInfo['이름']);
  }, []);

  return (
    <Autocomplete
      disablePortal
      id='combo-box'
      options={heroNameList}
      sx={{ width: 300 }}
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      renderInput={params => <TextField {...params} label='영웅을 선택하세요' />}
    />
  );
}
