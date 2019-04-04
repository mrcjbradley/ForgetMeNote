export const getAllNotes = () => (
    $.ajax({
        method: 'get',
        url: '/api/notes'
    })
);

export const getNote = noteId => (
    $.ajax({
        method: 'get',
        url: `/api/notes/${noteId}`
    })
);

export const patchNote = note => (
    $.ajax({
        method: 'patch',
        url: `/api/notes/${note.id}`,
        data: { note }
    })
);

export const postNote = note => (
    $.ajax({
        method: 'post',
        url: `/api/notes`,
        data: { note }
    })
);

export const deleteNote = notes => (
    $.ajax({
        method: 'delete',
        url: `/api/notes/${noteId}`
    })
);

export const emptyTrash = () => (
    $.ajax({
        method: 'delete',
        url: '/api/trash/empty_trash'
    })
);