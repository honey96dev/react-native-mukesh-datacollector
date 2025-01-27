import {
    LIST_REPORT,
    LIST_REPORT_BY_FORM,
    ADD_REPORT,
    DELETE_REPORT,
    DELETE_REPORT_BY_FORM,
    EDIT_REPORT,
    SET_SELECTED_FORM_DATA,
    SET_CREATE_REPORT_MODE,
    SET_REPORT_PROC_MODE,
    SET_CURRENT_REPORTS,
    SET_CURRENT_REPORTS2
} from '../actions/reports.types';

const initialState = {
    items: [],
    selectedFormId: '',
    selectedFormColumns: [],
    createReportMode: {},
    reportProcMode: '',
    currentReports: [],
    currentReports2: [],
};

const reportsReducer = (state: any = initialState, action: any) => {
    let index: number;
    let items: Array<any>;
    switch (action.type) {
        case LIST_REPORT:
            return {
                ...state,
                items: action.payload,
            };
        case LIST_REPORT_BY_FORM:
            return {
                ...state,
                items: action.payload,
            };
        case ADD_REPORT:
            return {
                ...state,
                items: state.items.push(action.payload),
            };
        case DELETE_REPORT:
            index = state.items.indexOf(action.payload);
            items = state.items;
            if (index !== -1) {
                items.splice(index, 1);
            }
            return {
                ...state,
                items: items,
            };
        case DELETE_REPORT_BY_FORM:
            index = state.items.indexOf(action.payload);
            items = state.items;
            if (index !== -1) {
                items.splice(index, 1);
            }
            return {
                ...state,
                items: items,
            };
        case EDIT_REPORT:
            index = state.items.indexOf(action.prev);
            items = state.items;
            if (index !== -1) {
                items[index] = action.current;
            }
            return {
                ...state,
                items: items,
            };
        case SET_SELECTED_FORM_DATA:
            return {
                ...state,
                selectedFormId: action.payload.id,
                selectedFormColumns: action.payload.columns,
            };
        case SET_CREATE_REPORT_MODE:
            return {
                ...state,
                createReportMode: action.payload,
            };
        case SET_REPORT_PROC_MODE:
            return {
                ...state,
                reportProcMode: action.payload,
            };
        case SET_CURRENT_REPORTS:
            return {
                ...state,
                currentReports: action.payload,
            };
        case SET_CURRENT_REPORTS2:
            return {
                ...state,
                currentReports2: action.payload,
            };
        default:
            return state;
    }
}

export default reportsReducer;