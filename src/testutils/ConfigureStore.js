import configureStore from '../store';

const configureTestStore = (params) => {
  const store = configureStore(params);
  store.dispatch = jest.fn(store.dispatch);
  return store;
};

export default configureTestStore;
