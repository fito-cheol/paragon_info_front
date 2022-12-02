import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Item, ItemList } from '../../utils/commonTypes';
import ImageItem from './Item';

interface ImageItemListProps {
  itemList: ItemList;
  onClick?: (item: Item) => void;
}

export default function ImageItemList({ itemList, onClick }: ImageItemListProps) {
  const [itemElements, setItemElements] = useState<JSX.Element[]>([<div key={1}></div>]);

  // computed
  useEffect(() => {
    setItemElements(
      itemList.map((item, index) => (
        <Grid xs='auto' key={`${index}__${item.name}`}>
          <ImageItem
            item={item}
            onClick={item => {
              if (onClick) onClick(item);
            }}
          />
        </Grid>
      )),
    );
  }, [itemList]);

  return (
    <Grid xs={12} container>
      {itemElements}
    </Grid>
  );
}
