import attributeLanguage from '../assets/item/attribute_language.json';

interface Category {
  name: string;
  value: string;
}
type CategoryArray = Array<Category>;

interface MetaData {
  title: string;
  description: string;
  categories: CategoryArray;
}
interface Conversation {
  context: string;
  reply: string;
  value: string | null;
  comment: string;
}

type ConversationArray = Array<Conversation>;

interface PageInfo {
  total: number;
  current: number;
}

type Item = {
  [index: string]: number | string; // 참고: https://soopdop.github.io/2020/12/01/index-signatures-in-typescript/
  이름: string;
  name: string;
  카테고리A: string;
  일회성: string;
  가격: number;
  '사용 효과 (w. tag)': string;
  '사용 효과': string;
  '사용 효과 쿨타임': number | string;
  '지속 효과 (w. tag)': string;
  '지속 효과': string;
  '지속 효과 쿨타임': number | string;
  '물리 공격력': number | string;
  '물리 관통력': number | string;
  '물리 방어력 무효화': number | string;
  '마법 공격력': number | string;
  '마법 관통력': number | string;
  '마법 방어력 무효화': number | string;
  '치명타 확률': number | string;
  '공격 속도': number | string;
  '생명력 흡수': number | string;
  '물리 피해 흡혈': number | string;
  '마법 피해 흡혈': number | string;
  '모든 피해 흡혈': number | string;
  '물리 방어력': number | string;
  '마법 방어력': number | string;
  체력: number | string;
  마나: number | string;
  '체력 재생': number | string;
  '마나 재생': number | string;
  '군중 제어 저항': number | string;
  '재사용 대기 시간 감소': number | string;
  '이동 속도': number | string;
  '골드 가치': number;
  하위템_List: string;
  '이미지 path': string;
};
type ItemArray = Array<Item>;

interface Attribute {
  attribute_en: string;
  attribute_kr: string;
}
type AttributeArray = Array<Attribute>;

const attributeList = [];
for (const attribueObject of attributeLanguage) {
  attributeList.push(attribueObject.attribute_en);
}
type Attributes = typeof attributeList[number];

type AttributeCheck = {
  [key in Attributes]: boolean;
};

export type {
  CategoryArray,
  MetaData,
  Conversation,
  ConversationArray,
  PageInfo,
  Item,
  ItemArray,
  AttributeArray,
  Attributes,
  AttributeCheck,
};
