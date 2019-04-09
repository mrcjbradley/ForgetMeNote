import { merge } from 'lodash';
import {
    RECEIVE_FILTER,
    REMOVE_FILTER,
    CLEAR_FILTERS
} from '../../actions/ui_actions';

const _placeHolder =  {tags: [], notebook: []};

const filtersReducer = ( oldState = _placeHolder, action ) => {
    Object.freeze(oldState);
    let nextState = merge({}, oldState);
    switch(action.type){
        case RECEIVE_FILTER:
        debugger
            nextState.tags = nextState.tags.concat(action.filters.tags);
            nextState.notebook = nextState.notebook.concat(action.filters.notebook);
            return nextState;
        case REMOVE_FILTER:
            nextState.tags = nextState.tags.filter(tag => !action.filters.tags.includes(tag));
            nextState.notebook = nextState.notebook.filter(notebook => !action.filters.notebook.includes(notebook));
            return nextState;
        case CLEAR_FILTERS:
            return _placeHolder;
        default:
            return nextState;
    }
};

export default filtersReducer;