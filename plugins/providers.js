import dogsProvider from '~/providers/dogs.provider.js';
export default (context, inject) => {
  const allMethods = {
    ...dogsProvider(context),
  };
  Object.keys(allMethods).forEach((method) => {
    inject(method, allMethods[method]);
  });
};