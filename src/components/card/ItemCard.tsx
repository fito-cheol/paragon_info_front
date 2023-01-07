import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import attributeList from 'assets/item/attribute_language.json';
import './ItemCard.scoped.scss';
import optionImages from 'assets/item/imagePreloaderOption';
import itemImages from 'assets/item/imagePreloaderItem';

export interface IItemCardProps {
  item: Item;
  onClick?: (item: Item) => void;
}

export default function ItemCard({ item, onClick }: IItemCardProps) {
  const [atrritbuteElements, setAtrritbuteElements] = useState<JSX.Element[]>();
  const [attributeArray] = React.useState<Attribute[]>(attributeList);

  useEffect(() => {
    const attributesHTML = attributeArray.map((attribute: Attribute) => {
      if (item[attribute.attribute_kr]) {
        return (
          <Grid container spacing={0.5} xs={12} key={item.name + attribute.attribute_en}>
            <Grid xs='auto'>
              <img
                src={optionImages[attribute.attribute_en]}
                alt={attribute.attribute_en}
                loading='lazy'
                width={20}
                height={20}
              />
            </Grid>
            <Grid xs='auto'>
              <Typography variant='body2' color='text.secondary'>
                {item[attribute.attribute_kr]} {attribute.attribute_kr}
              </Typography>
            </Grid>
          </Grid>
        );
      } else {
        return <React.Fragment key={attribute.attribute_en}></React.Fragment>;
      }
    });
    setAtrritbuteElements(attributesHTML);
  }, [attributeArray]);

  return (
    <Card
      className='itemCard'
      onClick={() => {
        if (onClick) {
          onClick(item);
        }
      }}
      sx={{
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid xs='auto'>
            <img src={itemImages[item.name]} alt={item['이름']} loading='lazy' width={60} height={60} />
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
          {atrritbuteElements}
        </Grid>
        {item['지속 효과'] ? (
          <Grid container spacing={0} alignItems='center' marginTop={1}>
            <Typography variant='body2' color='text.secondary'>
              지속 효과: {item['지속 효과']} {item['지속 효과 쿨타임'] ? `(${item['지속 효과 쿨타임']}초)` : ''}
            </Typography>
          </Grid>
        ) : (
          <React.Fragment />
        )}
        {item['사용 효과'] ? (
          <Grid container spacing={0} alignItems='center' marginTop={1}>
            <Typography variant='body2' color='text.secondary'>
              사용 효과: {item['사용 효과']} {item['사용 효과 쿨타임'] ? `(${item['사용 효과 쿨타임']}초)` : ''}
            </Typography>
          </Grid>
        ) : (
          <React.Fragment />
        )}
      </CardContent>
    </Card>
  );
}
