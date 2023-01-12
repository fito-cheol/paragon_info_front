interface ImageStorage {
  [key: string]: string;
}

function importAll(imageContext: __WebpackModuleApi.RequireContext) {
  const images = {} as ImageStorage;
  imageContext.keys().map(item => {
    images[item.replace('./', '').replace('.jpg', '')] = imageContext(item);
  });
  return images;
}

const images = importAll(require.context('./HERO_PROFILE', false, /.jpg/));

console.log('images', images);

export default images;
