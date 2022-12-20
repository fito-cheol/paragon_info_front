import itemList from './item_db.json';

type ITEM_DICT = {
  [index: string]: Item;
};
const itemDict: ITEM_DICT = {};
itemList.map(item => {
  itemDict[item.name] = item;
});

export default itemDict;
