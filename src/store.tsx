import { createStore, combineReducers } from 'redux';
import formsReducer from './reducers/formsReducer';
import reportsReducer from './reducers/reportsReducer';

const rootReducer = combineReducers({
    forms: formsReducer,
    reports: reportsReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;