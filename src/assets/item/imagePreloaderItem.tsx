interface ImageStorage {
  [key: string]: any;
}

function importAll(imageContext: __WebpackModuleApi.RequireContext) {
  const images = {} as ImageStorage;
  imageContext.keys().map(item => {
    images[item.replace('./', '').replace('.png', '')] = imageContext(item);
  });
  return images;
}

const images = importAll(require.context('./ITEM_IMAGE', false, /.png/));
console.log(images);
export default images;
