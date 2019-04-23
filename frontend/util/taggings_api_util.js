export const removeAllNotes = (tagId) => (
    $.ajax({
        method: 'delete',
        url: `/api/tags/${tagId}/taggings`
    })
);

