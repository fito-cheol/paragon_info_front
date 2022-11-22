import ItemCard from '../../components/card/ItemCard';
import React, { useState } from 'react';

type Item = {
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
  마법공격력: number | string;
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
export default function List() {
  const [item, setItem] = useState<Item>({
    이름: '체력 회복 물약',
    name: 'HEALTH POTION',
    카테고리A: '시작',
    일회성: 'TRUE',
    가격: 50,
    '사용 효과 (w. tag)': '20초 동안 <green>체력을 200</green> 회복합니다',
    '사용 효과': '20초 동안 체력을 200 회복합니다',
    '사용 효과 쿨타임': '',
    '지속 효과 (w. tag)': '',
    '지속 효과': '',
    '지속 효과 쿨타임': '',
    '물리 공격력': '',
    '물리 관통력': '',
    '물리 방어력 무효화': '',
    마법공격력: '',
    '마법 관통력': '',
    '마법 방어력 무효화': '',
    '치명타 확률': '',
    '공격 속도': '',
    '생명력 흡수': '',
    '물리 피해 흡혈': '',
    '마법 피해 흡혈': '',
    '모든 피해 흡혈': '',
    '물리 방어력': '',
    '마법 방어력': '',
    체력: '',
    마나: '',
    '체력 재생': '',
    '마나 재생': '',
    '군중 제어 저항': '',
    '재사용 대기 시간 감소': '',
    '이동 속도': '',
    '골드 가치': 0,
    하위템_List: '',
    '이미지 path': '',
  });

  return <ItemCard item={item}></ItemCard>;
}
