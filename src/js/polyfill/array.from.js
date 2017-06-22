export default () => {
  if (!Array.from) {
    Array.from = object => [].slice.call(object);
  }
};
