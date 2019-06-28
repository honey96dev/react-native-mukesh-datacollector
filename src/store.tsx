import {createStore, combineReducers} from 'redux';
import formsReducer from './reducers/formsReducer';
import reportsReducer from './reducers/reportsReducer';
import foldersReducer from './reducers/foldersReducer';

const rootReducer = combineReducers({
    forms: formsReducer,
    reports: reportsReducer,
    folders: foldersReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;