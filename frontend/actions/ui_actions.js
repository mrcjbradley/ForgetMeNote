export const [
    RECEIVE_CURRENT_NOTE
] = 
[
    'RECEIVE_CURRENT_NOTE'
];

export const receiveCurrentNote = noteId => ({
    type: RECEIVE_CURRENT_NOTE,
    noteId
});