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

const images = importAll(require.context('./ITEM_OPTION_IMAGE', false, /.png/));

export default images;
