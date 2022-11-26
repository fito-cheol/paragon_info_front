import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Item, ItemArray, Attributes, AttributeCheck, PageInfo } from '../../utils/commonTypes';
import ItemCard from '../../components/card/ItemCard';
import ItemFilter from '../../components/filter/ItemFilter';

import itemJson from '../../assets/item/item_db.json';
import attributeList from '../../assets/item/attribute_language.json';

type LangConverter = {
  [key: string]: string;
};
const langConverter = {} as LangConverter;
for (const attributeObject of attributeList) {
  langConverter[attributeObject.attribute_en] = attributeObject.attribute_kr;
}

export default function List() {
  const [itemList, setItemList] = useState<ItemArray>([]);
  const [itemElements, setItemElements] = useState<JSX.Element[]>([<div key={1}></div>]);
  useEffect(() => {
    setItemList(itemJson);
  }, []);
  useEffect(() => {
    setItemElements(
      itemList.map(item => (
        <Grid xs={6} key={item.name}>
          <ItemCard item={item} />{' '}
        </Grid>
      )),
    );
  }, [itemList]);

  const updateCheck = (checkObject: AttributeCheck) => {
    const checkList: Attributes[] = [];
    for (const [attribute, checked] of Object.entries(checkObject)) {
      if (checked) {
        checkList.push(attribute);
      }
    }
    const filteredItems = itemJson.filter((item: Item) => {
      for (const attribute_en of checkList) {
        const attribute_kr = langConverter[attribute_en];
        const canFindValue = item[attribute_kr];
        if (!canFindValue) return false;
      }
      return true;
    });

    setItemList(filteredItems);
  };

  return (
    <Grid container>
      <Grid xs={12}>
        <ItemFilter onUpdate={checkObject => updateCheck(checkObject)} />
      </Grid>
      <Grid xs={12} container>
        {itemElements}
      </Grid>
    </Grid>
  );
}
