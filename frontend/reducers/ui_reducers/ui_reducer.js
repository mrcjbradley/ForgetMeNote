import { combineReducers } from 'redux';
// import currentNote from './current_note_reducer';
import editorPreferences from './editor_preferences_reducer';
import recentNotes from './recent_notes_reducer';
import modal from './modal_reducer';



export default combineReducers({
    // currentNote,
    recentNotes,
    editorPreferences,
    modal
});
