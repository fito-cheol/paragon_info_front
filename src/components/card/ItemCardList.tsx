import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import ItemCard from 'components/card/ItemCard';

interface ItemCardListProps {
  itemList: Item[];
  onClick?: (item: Item) => void;
}

export default function ItemCardList(props: ItemCardListProps) {
  const { itemList, onClick } = props;
  const [itemElements, setItemElements] = useState<JSX.Element[]>([<div key={1}></div>]);

  // computed
  useEffect(() => {
    setItemElements(
      itemList.map(item => (
        <Grid xs={6} md={4} xl={3} key={item.name}>
          <ItemCard
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
