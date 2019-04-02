import { combineReducers } from 'redux';
import currentNote from './ui_reducers/current_note_reducer';
import editorPreferences from './ui_reducers/editor_preferences_reducer';
import modal from './ui_reducers/modal_reducer';



export default combineReducers({
    currentNote,
    editorPreferences,
    modal
});
