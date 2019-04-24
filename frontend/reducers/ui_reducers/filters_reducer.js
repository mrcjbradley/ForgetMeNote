import { merge } from 'lodash';
import { REMOVE_TAG } from '../../actions/tag_action';
import {
    RECEIVE_FILTER,
    REMOVE_TAG_FILTER,
    REMOVE_NOTEBOOK_FILTER,
    CLEAR_FILTERS
} from '../../actions/ui_actions';

const _placeHolder =  {tags: -1, notebook: -1};

const filtersReducer = ( oldState = _placeHolder, action ) => {
    Object.freeze(oldState);
    let nextState = merge({}, oldState);
    switch(action.type){
        case RECEIVE_FILTER:
            nextState.tags = action.filters.tags ? action.filters.tags : nextState.tags;
            nextState.notebook = action.filters.notebook ? action.filters.notebook : nextState.notebook;
            return nextState;
        case REMOVE_TAG:
            if (oldState.tags > -1 && action.tags == oldState.tags){
                return nextState;
            } else {
                nextState.tags = -1;
                return nextState;
            }
        case REMOVE_TAG_FILTER:
            nextState.tags = -1;
            return nextState;
        case REMOVE_NOTEBOOK_FILTER:
            nextState.notebook = -1;
            return nextState;
        case CLEAR_FILTERS:
            return _placeHolder;
        default:
            return nextState;
    }
};

export default filtersReducer;