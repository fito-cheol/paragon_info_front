import * as React from 'react';
import { useTheme } from '@mui/material';

import './SkillTree.scoped.scss';
import images from '../../assets/hero/imagePreloaderSkillTree';

type SkillTreeType = 'Q' | 'E' | 'R' | 'Right' | 'None';

interface SKILL_TREE_IMAGE_PROPS {
  type: SkillTreeType;
  size?: number;
  onClick?: () => void;
}

export default function SkillTreeImage({ type, size, onClick }: SKILL_TREE_IMAGE_PROPS) {
  const theme = useTheme();

  return (
    <img
      className='skillTree__img'
      src={images[type]}
      loading='lazy'
      width={size || 24}
      height={size || 24}
      onClick={() => {
        if (onClick) onClick();
      }}
    />
  );
}
