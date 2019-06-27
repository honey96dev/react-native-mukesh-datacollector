import {LIST_REPORT, LIST_REPORT_BY_FORM, ADD_REPORT, DELETE_REPORT, DELETE_REPORT_BY_FORM, EDIT_REPORT, SET_SELECTED_FORM_DATA, SET_CREATE_REPORT_MODE} from './reports.types';

const listReport = (items: Array<any>) => {
    return {
        type: LIST_REPORT,
        payload: items,
    }
};
const listReportByForm = (form: any, items: Array<any>) => {
    return {
        type: LIST_REPORT_BY_FORM,
        form: form,
        items: items,
    }
};
const addReport = (item: any) => {
    return {
        type: ADD_REPORT,
        payload: item,
    }
};
const deleteReport = (item: any) => {
    return {
        type: DELETE_REPORT,
        payload: item,
    }
};
const deleteReportByForm = (form: any) => {
    return {
        type: DELETE_REPORT_BY_FORM,
        payload: form,
    }
};
const editReport = (prev: any, current: any) => {
    return {
        type: EDIT_REPORT,
        prev: prev,
        current: current,
    }
};
const setSelectedFormData = (data: object) => {
    return {
        type: SET_SELECTED_FORM_DATA,
        payload: data,
    }
};
const setCreateReportMode = (mode: object) => {
    return {
        type: SET_CREATE_REPORT_MODE,
        payload: mode,
    }
};

export {
    listReport,
    listReportByForm,
    addReport,
    deleteReport,
    deleteReportByForm,
    editReport,
    setSelectedFormData,
    setCreateReportMode,
}
