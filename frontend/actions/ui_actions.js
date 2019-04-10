export const [
    RECEIVE_CURRENT_NOTE,
    TOGGLE_FULL_SCREEN,
    OPEN_MODAL,
    CLOSE_MODAL,
    RECEIVE_FILTER,
    REMOVE_TAG_FILTER,
    REMOVE_NOTEBOOK_FILTER,
    CLEAR_FILTERS

] = 
[
    'RECEIVE_CURRENT_NOTE',
    'TOGGLE_FULL_SCREEN',
    'OPEN_MODAL',
    'CLOSE_MODAL',
    'RECEIVE_FILTER',
    'REMOVE_TAG_FILTER',
    'REMOVE_NOTEBOOK_FILTER',
    'CLEAR_FILTERS'

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

export const receiveFilter = filters => ({
    type: RECEIVE_FILTER,
    filters
});

export const removeTagFilter = filters => ({
    type: REMOVE_TAG_FILTER,
});

export const removeNotebookFilter = filters => ({
    type: REMOVE_NOTEBOOK_FILTER,
});

export const clearFilters = () => ({
    type: CLEAR_FILTERS
});