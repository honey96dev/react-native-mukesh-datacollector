import {LIST_FORM, ADD_FORM, DELETE_FORM, EDIT_FORM, SET_CREATE_FORM_MODE} from '../actions/forms.types';

const initialState = {
    forms: [],
    createFormMode: {},
};

const formsReducer = (state: any = initialState, action: any) => {
    let index: number;
    let forms: Array<any>;
    switch (action.type) {
        case LIST_FORM:
            return {
                ...state,
                forms: action.payload,
            };
        case ADD_FORM:
            return {
                ...state,
                forms: state.forms.push(action.payload),
            };
        case DELETE_FORM:
            index = state.forms.indexOf(action.payload);
            forms = state.forms;
            if (index !== -1) {
                forms.splice(index, 1);
            }
            return {
                ...state,
                forms: forms,
            };
        case EDIT_FORM:
            index = state.forms.indexOf(action.prev);
            forms = state.forms;
            if (index !== -1) {
                forms[index] = action.current;
            }
            return {
                ...state,
                forms: forms,
            };
        case SET_CREATE_FORM_MODE:
            return {
                ...state,
                createFormMode: action.payload,
            };
        default:
            return state;
    }
}

export default formsReducer;