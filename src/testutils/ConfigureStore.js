import configureStore from '../store';

const configureTestStore = (params) => {
  const store=configureStore(params)
  const initialDispatch = store.dispatch;
  store.dispatch = jest.fn(initialDispatch)
  return store;
}

export default configureTestStore;