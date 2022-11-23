import ItemCard from '../../components/card/ItemCard';
import React, { useState } from 'react';
import itemJson from '../../assets/item/item_db.json';
import { ItemArray } from '../../utils/commonTypes';

export default function List() {
  const [itemList, setItemList] = useState<ItemArray>(itemJson);
  const itemHtml = itemList.map(item => <ItemCard key={item.name} item={item} />);
  return <div> {itemHtml} </div>;
}
