import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import itemJson from '../../assets/item/item_db.json';
import { ItemArray } from '../../utils/commonTypes';
import ItemCard from '../../components/card/ItemCard';
import ItemFilter from '../../components/filter/ItemFilter';

type checkList = {
  [key: string]: boolean;
};

export default function List() {
  const [itemList, setItemList] = useState<ItemArray>(itemJson);
  const [checkedFilter, setCheckedFilter] = useState<checkList>();
  const itemHtml = itemList.map(item => <ItemCard key={item.name} item={item} />);
  const updateCheck = (key: string, value: boolean) => {
    setCheckedFilter(prevState => {
      return { ...prevState, [key]: value };
    });
  };
  return (
    <Grid container>
      <Grid xs={12}>
        <ItemFilter onUpdate={updateCheck} />
      </Grid>
      <Grid xs={12}>{itemHtml}</Grid>
    </Grid>
  );
}
