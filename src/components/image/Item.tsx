import React from 'react';
import Popover from '@mui/material/Popover';

import itemImages from 'assets/item/imagePreloaderItem';
import ItemCard from 'components/card/ItemCard';
import './Item.scoped.scss';

interface ImageItemProps {
  item: Item;
  size?: number;
  onClick?: (item: Item) => void;
}

export default function ImageItem({ item, size, onClick }: ImageItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <img
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        src={itemImages[item.name]}
        loading='lazy'
        width={size || 40}
        height={size || 40}
        onClick={() => {
          if (onClick) {
            onClick(item);
          }
        }}
      />
      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className='popover__wrapper'>
          <ItemCard item={item}></ItemCard>
        </div>
      </Popover>
    </div>
  );
}
