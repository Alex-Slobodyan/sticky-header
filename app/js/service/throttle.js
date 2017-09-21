export default (callback, threshhold = 250, context = window) => {
  let wait = false;
  return (...args) => {
    if (!wait) {
      callback.apply(context, args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, threshhold);
    }
  };
};
