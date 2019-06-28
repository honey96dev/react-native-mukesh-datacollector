import {LIST_FOLDER, ADD_FOLDER, DELETE_FOLDER, EDIT_FOLDER, SET_CREATE_FOLDER_MODE} from './folders.types';

const listFolder = (folders: Array<any>) => {
    return {
        type: LIST_FOLDER,
        payload: folders,
    }
};
const addFolder = (folder: any) => {
    return {
        type: ADD_FOLDER,
        payload: folder,
    }
};
const deleteFolder = (folder: any) => {
    return {
        type: DELETE_FOLDER,
        payload: folder,
    }
};
const editFolder = (prev: any, current: any) => {
    return {
        type: EDIT_FOLDER,
        prev: prev,
        current: current,
    }
};
const setCreateFolderMode = (mode: object) => {
    return {
        type: SET_CREATE_FOLDER_MODE,
        payload: mode,
    }
};

export {
    listFolder,
    addFolder,
    deleteFolder,
    editFolder,
    setCreateFolderMode,
}
