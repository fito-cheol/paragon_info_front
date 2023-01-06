import React from 'react';

import ItemListWithFilter from 'components/combined/ItemListWithFilter';

export default function List() {
  return <ItemListWithFilter onItemSelect={(e: Item) => console.log(e)} />;
}
