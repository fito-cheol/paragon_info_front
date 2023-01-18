interface ImageStorage {
  [key: string]: string;
}

function importAll(imageContext: __WebpackModuleApi.RequireContext) {
  const images = {} as ImageStorage;
  imageContext.keys().map(item => {
    images[item.replace('./', '').replace('.png', '')] = imageContext(item);
  });
  return images;
}

const images = importAll(require.context('./HERO_BACKGROUND', false, /.png/));

console.log('images', images);

export default images;
