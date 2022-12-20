// https://bobbyhadz.com/blog/typescript-make-types-global
// To declare global types in TypeScript:

// Create a global.d.ts file and declare types in the global namespace.
// Add types or interfaces that need to be globally accessible.
// Make the file a module by using export {}.
import attributeLanguage from 'assets/item/attribute_language.json';

const attributeList: string[] = [];
for (const attribueObject of attributeLanguage) {
  attributeList.push(attribueObject.attribute_en);
}

declare global {
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
  interface Hero {
    이름: string;
    name: string;
    TITLE_Q: string;
    TITLE_E: string;
    TITLE_R: string;
    TITLE_RIGHT: string;
    TITLE_LEFT: string;
    DETAIL_Q_SIMPLE: string;
    DETAIL_E_SIMPLE: string;
    DETAIL_R_SIMPLE: string;
    DETAIL_RIGHT_SIMPLE: string;
    DETAIL_LEFT_SIMPLE: string;
    DETAIL_Q: string;
    DETAIL_E: string;
    DETAIL_R: string;
    DETAIL_RIGHT: string;
    DETAIL_LEFT: string;
    Q0: string;
    Q1: string;
    Q2: string;
    Q3: string;
    Q4: string;
    Q5: string;
    E0: string;
    E1: string;
    E2: string;
    E3: string;
    E4: string;
    E5: string;
    R0: string;
    R1: string;
    R2: string;
    R3: string;
    RIGHT0: string;
    RIGHT1: string;
    RIGHT2: string;
    RIGHT3: string;
    RIGHT4: string;
    RIGHT5: string;
  }
  type SkillTree = 'Q' | 'E' | 'R' | 'Right' | 'None';
  interface Attribute {
    attribute_en: string;
    attribute_kr: string;
  }

  type Attributes = typeof attributeList[number];

  type AttributeCheck = {
    [key in Attributes]: boolean;
  };

  // API Format
  interface UploadForamt {
    heroName: string;
    skillTree: string[];
    startItems: string[];
    endItems: string[];
    possibleItems: string[];
    text: string;
    title: string;
  }

  interface ListFormat {
    page: number;
    pageSize: number;
  }

  interface Post {
    id: number;
    user_FK: number;
    content_FK: number;
    title: string;
    create_date: string;
    click_cnt: number;
    delete: string;
  }

  interface Content {
    id: number;
    hero_FK: string;
    skill_list: string;
    start_item_list: string;
    end_item_list: string;
    possible_item_list: string;
    text: string;
  }
  interface GetPostFormat {
    postId: number;
  }
  interface GetContentFormat {
    content_FK: number;
  }

  interface ReturnCount {
    totalCount: number;
  }
}
