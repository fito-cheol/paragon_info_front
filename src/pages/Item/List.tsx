import React, { useState, useEffect } from 'react';

import ItemListWithFilter from 'components/combined/ItemListWithFilter';

export default function List() {
  return <ItemListWithFilter onItemSelect={(e: Item) => console.log(e)} />;
}
