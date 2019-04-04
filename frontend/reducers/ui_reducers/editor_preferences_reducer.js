import {
    TOGGLE_FULL_SCREEN,
} from '../../actions/ui_actions';
import { merge } from 'lodash';

const _placeHolder =  { fullscreen: false };

const editorPreferencesReducer = ( oldState = _placeHolder, action ) => {
    Object.freeze(oldState);
    
    let nextState = merge({}, oldState);
    switch(action.type){
        case TOGGLE_FULL_SCREEN:
            nextState.fullscreen = !nextState.fullscreen;
            return nextState;
        default:
            return nextState;
    }
};

export default editorPreferencesReducer;