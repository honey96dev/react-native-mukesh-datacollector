import {LIST_FOLDER, ADD_FOLDER, DELETE_FOLDER, EDIT_FOLDER, SET_CREATE_FOLDER_MODE} from '../actions/folders.types';

const initialState = {
    folders: [],
    createFolderMode: {},
};

const foldersReducer = (state: any = initialState, action: any) => {
    let index: number;
    let folders: Array<any>;
    switch (action.type) {
        case LIST_FOLDER:
            return {
                ...state,
                folders: action.payload,
            };
        case ADD_FOLDER:
            return {
                ...state,
                folders: state.folders.push(action.payload),
            };
        case DELETE_FOLDER:
            index = state.folders.indexOf(action.payload);
            folders = state.folders;
            if (index !== -1) {
                folders.splice(index, 1);
            }
            return {
                ...state,
                folders: folders,
            };
        case EDIT_FOLDER:
            index = state.folders.indexOf(action.prev);
            folders = state.folders;
            if (index !== -1) {
                folders[index] = action.current;
            }
            return {
                ...state,
                folders: folders,
            };
        case SET_CREATE_FOLDER_MODE:
            return {
                ...state,
                createFolderMode: action.payload,
            };
        default:
            return state;
    }
}

export default foldersReducer;