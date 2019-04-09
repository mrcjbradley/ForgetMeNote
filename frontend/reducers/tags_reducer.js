import { 
    RECEIVE_ALL_NOTES,
    RECEIVE_DELETED_NOTE,
    RECEIVE_NOTE
 } from '../actions/note_actions';
 import {
     RECEIVE_ALL_TAGS
 } from '../actions/tag_action';

export default (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_ALL_NOTES: 
        case RECEIVE_ALL_TAGS:
            return action.tags;
        case RECEIVE_DELETED_NOTE: 
        case RECEIVE_NOTE: 
            return Object.assign({}, oldState, action.tags);
        default:
            return oldState;
    }
};