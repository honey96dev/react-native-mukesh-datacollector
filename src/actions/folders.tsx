import {
    LIST_FOLDER,
    ADD_FOLDER,
    DELETE_FOLDER,
    EDIT_FOLDER,
    SET_CREATE_FOLDER_MODE,
    LIST_USER2FOLDERS,
    LIST_MANAGER2FOLDERS,
    SET_SELECTED_FOLDER,
} from './folders.types';

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
const listUser2Folders = (items: any[]) => {
    return {
        type: LIST_USER2FOLDERS,
        payload: items,
    }
};
const listManager2Folders = (items: any[]) => {
    return {
        type: LIST_MANAGER2FOLDERS,
        payload: items,
    }
};
const setSelectedFolder = (items: any[]) => {
    return {
        type: SET_SELECTED_FOLDER,
        payload: items,
    }
};

export {
    listFolder,
    addFolder,
    deleteFolder,
    editFolder,
    setCreateFolderMode,
    listUser2Folders,
    listManager2Folders,
    setSelectedFolder,
}
