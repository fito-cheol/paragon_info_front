import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '@mui/material/styles';

import { Item, ItemList, Attributes, AttributeCheck } from '../../utils/commonTypes';
import ItemCardList from '../card/ItemCardList';
import ItemImageList from '../image/ItemList';
import ItemFilter from '../filter/ItemFilter';
import './ItemListWithFilter.scoped.scss';

import itemJson from '../../assets/item/item_db.json';
import attributeList from '../../assets/item/attribute_language.json';

type LangConverter = {
  [key: string]: string;
};
const langConverter = {} as LangConverter;
for (const attributeObject of attributeList) {
  langConverter[attributeObject.attribute_en] = attributeObject.attribute_kr;
}
interface itemListWithFilterProps {
  onItemSelect?: (item: Item) => void;
  onFilterUpdate?: (filter: AttributeCheck) => void;
  onOptionUpdate?: (isSmall: boolean) => void;
  defaultFilter?: AttributeCheck;
  defaultIsSmall?: boolean;
}

export default function itemListWithFilter({
  onItemSelect,
  onFilterUpdate,
  onOptionUpdate,
  defaultFilter,
  defaultIsSmall,
}: itemListWithFilterProps) {
  const [itemList, setItemList] = useState<ItemList>([]);
  const [isSmall, setIsSmall] = useState<boolean>(defaultIsSmall || true);
  const [filter, setFilter] = useState<AttributeCheck | undefined>(defaultFilter || undefined);

  const theme = useTheme();
  // onMount
  useEffect(() => {
    setItemList(itemJson);
  }, []);

  useEffect(() => {
    if (onFilterUpdate && filter) onFilterUpdate(filter);
    if (!filter) return;

    const checkList: Attributes[] = [];

    for (const [attribute, checked] of Object.entries(filter)) {
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
  }, [filter]);

  useEffect(() => {
    if (onOptionUpdate) onOptionUpdate(isSmall);
  }, [isSmall]);

  const updateCheck = (checkObject: AttributeCheck) => {
    setFilter(checkObject);
  };

  return (
    <Grid container className={`wrapper wrapper--${theme.palette.mode}`}>
      <Grid xs={12}>
        <ItemFilter onUpdate={checkObject => updateCheck(checkObject)} filterValue={filter} />
      </Grid>
      <Grid xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSmall}
              onChange={e => {
                setIsSmall(!isSmall);
              }}
            />
          }
          label='간략히'
        />
      </Grid>
      <Grid xs={12} container className={isSmall ? 'hidden' : undefined}>
        <ItemCardList
          itemList={itemList}
          onClick={item => {
            if (onItemSelect) onItemSelect(item);
          }}
        />
      </Grid>
      <Grid xs={12} container className={isSmall ? undefined : 'hidden'}>
        <ItemImageList
          itemList={itemList}
          onClick={item => {
            if (onItemSelect) onItemSelect(item);
          }}
        />
      </Grid>
    </Grid>
  );
}
