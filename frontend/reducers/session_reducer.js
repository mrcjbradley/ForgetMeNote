import {
    combineReducers
} from 'redux';
import currentUser from './current_user_reducer';

export default combineReducers({
    currentUser
});