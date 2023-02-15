interface ImageStorage {
  [key: string]: string;
}

function importAll(imageContext: __WebpackModuleApi.RequireContext) {
  const images = {} as ImageStorage;
  imageContext.keys().map(item => {
    images[item.replace('./', '').replace('.webp', '')] = imageContext(item);
  });
  return images;
}

const images = importAll(require.context('./HERO_BACKGROUND', false, /.webp/));

console.log('images', images);

export default images;
