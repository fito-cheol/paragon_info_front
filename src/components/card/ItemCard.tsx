import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { Item, AttributeArray } from '../../utils/commonTypes';
import attributeList from '../../assets/item/attribute_language.json';

export interface IItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: IItemCardProps) {
  const [currentImage, setCurrentImage] = React.useState<string>();
  import(`../../assets/item/ITEM_IMAGE/${item.name}.png`).then(image => setCurrentImage(image.default));
  const [attribueArray, setAttribueArray] = React.useState<AttributeArray>(attributeList);
  const attributesHTML = attribueArray.map(attribute => {
    if (item[attribute.attribute_kr]) {
      return (
        <Grid container spacing={0} xs={12}>
          <Grid xs='auto'>
            <img
              src={`ITEM_OPTION_IMAGE/${attribute.attribute_en}.png`}
              alt={attribute.attribute_en}
              loading='lazy'
              width={20}
              height={20}
            />
          </Grid>
          <Grid xs='auto'>
            <Typography variant='body2' color='text.secondary' key={attribute.attribute_en}>
              {item[attribute.attribute_kr]} {attribute.attribute_kr}
            </Typography>
          </Grid>
        </Grid>
      );
    } else {
      return <React.Fragment key={attribute.attribute_en}></React.Fragment>;
    }
  });
  return (
    <Card className='itemCard'>
      <CardContent>
        <Grid container spacing={1}>
          <Grid xs='auto'>
            <img src={currentImage} alt={item['name']} loading='lazy' width={70} height={70} />
          </Grid>
          <Grid container spacing={0}>
            <Grid xs={12}>
              <Typography variant='body1' color='text.secondary'>
                {item['이름']}
              </Typography>
            </Grid>
            <Grid xs='auto'>
              <img src='gold_icon.png' alt={item['name']} loading='lazy' width={30} height={23} />
            </Grid>
            <Grid xs={6}>
              <Typography variant='body1' color='text.secondary'>
                {item['가격']}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          {attributesHTML}
        </Grid>
        {item['지속 효과'] ? (
          <Typography variant='body2' color='text.secondary'>
            지속 효과: {item['지속 효과']} {item['지속 효과 쿨타임'] ? `(${item['지속 효과 쿨타임']}초)` : ''}
          </Typography>
        ) : (
          <React.Fragment />
        )}
        {item['사용 효과'] ? (
          <Typography variant='body2' color='text.secondary'>
            사용 효과: {item['사용 효과']} {item['사용 효과 쿨타임'] ? `(${item['사용 효과 쿨타임']}초)` : ''}
          </Typography>
        ) : (
          <React.Fragment />
        )}
      </CardContent>
    </Card>
  );
}
