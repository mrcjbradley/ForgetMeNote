export const [
    RECEIVE_CURRENT_NOTE,
    TOGGLE_FULL_SCREEN
] = 
[
    'RECEIVE_CURRENT_NOTE',
    'TOGGLE_FULL_SCREEN'
];

export const receiveCurrentNote = noteId => ({
    type: RECEIVE_CURRENT_NOTE,
    noteId
});

export const toggleFullScreen = () => ({
    type: TOGGLE_FULL_SCREEN
});