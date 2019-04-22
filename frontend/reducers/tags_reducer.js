import { 
    RECEIVE_ALL_NOTES,
    RECEIVE_DELETED_NOTE,
    RECEIVE_NOTE
 } from '../actions/note_actions';
 import {
     RECEIVE_ALL_TAGS,
     RECEIVE_TAG,
     REMOVE_TAG
 } from '../actions/tag_action';

export default (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_ALL_NOTES: 
        case RECEIVE_ALL_TAGS:
            return action.tags;
        case RECEIVE_TAG:
            const newTagObj = { [action.tag.id]: action.tag };
            return Object.assign({}, oldState, newTagObj);
        case REMOVE_TAG:
            const nextState = Object.assign({}, oldState);
            delete nextState[action.tagId];
            return nextState;
        case RECEIVE_DELETED_NOTE: 
        case RECEIVE_NOTE: 
            return Object.assign({}, oldState, action.tags);
        default:
            return oldState;
    }
};