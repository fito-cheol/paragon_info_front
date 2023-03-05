import React from 'react';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ImageGallery from 'react-image-gallery';

const sampleImages = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];
interface Props {
  images: google.maps.places.PlacePhoto[];
}
export default function Gallery({ images }: Props) {
  const formatImage = images.map(image => {
    return { original: image.getUrl(), thumbnail: image.getUrl() };
  });
  return <ImageGallery items={formatImage} />;
}
