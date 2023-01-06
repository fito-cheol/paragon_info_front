import * as React from 'react';

import './SkillTree.scoped.scss';
import images from 'assets/hero/imagePreloaderSkillTree';

interface SKILL_TREE_IMAGE_PROPS {
  type: SkillTree;
  size?: number;
  onClick?: () => void;
}

export default function SkillTreeImage({ type, size, onClick }: SKILL_TREE_IMAGE_PROPS) {
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
