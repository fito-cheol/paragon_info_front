import React, { useState, useEffect } from 'react';

import ItemListWithFilter from '../../components/combined/ItemListWithFilter';

import { Item } from '../../utils/commonTypes';
export default function List() {
  return <ItemListWithFilter onItemSelect={(e: Item) => console.log(e)} />;
}
