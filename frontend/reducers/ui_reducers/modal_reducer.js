
import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../../actions/ui_actions';

import { merge } from 'lodash';

const _placeHolder =  {open: false, modal: {title: null, content: null, buttonType: 'cancel continue' }};

const modalReducer = ( oldState = _placeHolder, { type, modal } ) => {
    Object.freeze(oldState);
    let nextState = merge({}, oldState);
    switch(type){
        case OPEN_MODAL:
            nextState = merge({}, nextState,{open: true}, {modal});
            return nextState;
        case CLOSE_MODAL:
            nextState = _placeHolder;
            return nextState;
        default:
            return nextState;
    }
};

export default modalReducer;