import {
    ADD_FOLDER,
    DELETE_FOLDER,
    EDIT_FOLDER,
    LIST_FOLDER,
    LIST_MANAGER2FOLDERS,
    LIST_USER2FOLDERS,
    SET_CREATE_FOLDER_MODE,
    SET_SELECTED_FOLDER,
} from '../actions/folders.types';

const initialState = {
    folders: [],
    createFolderMode: {},
    manager2Folders: [],
    user2Folders: [],
    selectedFolder: undefined,
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
        case LIST_MANAGER2FOLDERS:
            return {
                ...state,
                manager2Folders: action.payload,
            };
        case LIST_USER2FOLDERS:
            return {
                ...state,
                user2Folders: action.payload,
            };
        case SET_SELECTED_FOLDER:
            return {
                ...state,
                selectedFolder: action.payload,
            };
        default:
            return state;
    }
}

export default foldersReducer;