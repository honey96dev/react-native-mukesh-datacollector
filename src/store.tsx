import { createStore, combineReducers } from 'redux';
import formsReducer from './reducers/formsReducer';

const rootReducer = combineReducers({
    forms: formsReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;