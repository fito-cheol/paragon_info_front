import React from 'react';

import heroImages from 'assets/hero/imagePreloaderHero';
import heroDict from 'assets/hero/heroDict';

interface Props {
  heroName: string;
  big?: boolean;
}

export default function ImageHero({ heroName, big }: Props) {
  let size = { width: 48, height: 60 };
  if (big) {
    size = { width: 100, height: 125 };
  }

  return (
    <img
      src={heroImages[heroName]}
      title={heroDict[heroName].이름}
      loading='lazy'
      width={size.width}
      height={size.height}
    />
  );
}
