import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import itemJson from '../../assets/item/item_db.json';
import { Item, ItemArray, Attributes, AttributeCheck } from '../../utils/commonTypes';
import ItemCard from '../../components/card/ItemCard';

import ItemFilter from '../../components/filter/ItemFilter';

export default function List() {
  const [itemList, setItemList] = useState<ItemArray>(itemJson);

  const updateCheck = (checkObject: AttributeCheck) => {
    const checkList: Attributes[] = [];
    for (const [attribute, checked] of Object.entries(checkObject)) {
      if (checked) {
        checkList.push(attribute);
      }
    }
    const filteredItems = itemJson.filter((item: Item) => {
      for (const attribute of checkList) {
        const canFindValue = item[attribute];
        if (!canFindValue) return false;
      }
      return true;
    });
    console.log(filteredItems);
    // setItemList(filteredItems);
  };
  return (
    <Grid container>
      <Grid xs={12}>
        <ItemFilter onUpdate={updateCheck} />
      </Grid>
      <Grid xs={12}>
        {itemList.map(item => (
          <ItemCard key={item.name} item={item} />
        ))}
      </Grid>
    </Grid>
  );
}
