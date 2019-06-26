import {LIST_FORM, ADD_FORM, DELETE_FORM, EDIT_FORM, SET_CREATE_FORM_MODE} from './forms.types';

const listForm = (forms: Array<any>) => {
    return {
        type: LIST_FORM,
        payload: forms,
    }
};
const addForm = (form: any) => {
    return {
        type: ADD_FORM,
        payload: form,
    }
};
const deleteForm = (form: any) => {
    return {
        type: DELETE_FORM,
        payload: form,
    }
};
const editForm = (prev: any, current: any) => {
    return {
        type: EDIT_FORM,
        prev: prev,
        current: current,
    }
};
const setCreateFormMode = (mode: object) => {
    return {
        type: SET_CREATE_FORM_MODE,
        payload: mode,
    }
};

export {
    listForm,
    addForm,
    deleteForm,
    editForm,
    setCreateFormMode,
}
