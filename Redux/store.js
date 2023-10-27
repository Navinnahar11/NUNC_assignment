import {createStore, combineReducers} from 'redux';
import videoReducer from './Reducer';
const rootReducer = combineReducers({video: videoReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
