export const [
    RECEIVE_CURRENT_NOTE,
    TOGGLE_FULL_SCREEN,
    OPEN_MODAL,
    CLOSE_MODAL
] = 
[
    'RECEIVE_CURRENT_NOTE',
    'TOGGLE_FULL_SCREEN',
    'OPEN_MODAL',
    'CLOSE_MODAL'
];

export const receiveCurrentNote = noteId => ({
    type: RECEIVE_CURRENT_NOTE,
    noteId
});

export const toggleFullScreen = () => ({
    type: TOGGLE_FULL_SCREEN
});

export const openModal = modal => ({
    type: OPEN_MODAL,
    modal
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});