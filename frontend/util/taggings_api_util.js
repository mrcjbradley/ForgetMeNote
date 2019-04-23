export const removeAllNotes = (tagId) => (
    $.ajax({
        method: 'delete',
        url: `/api/tags/${tagId}/taggings`
    })
);

export const postTagging = (tagging) => (
    $.ajax({
        method: 'post',
        url: `/api/taggings`,
        data: tagging
    })
);

export const removeTagging = (tagging) => (
    $.ajax({
        method: 'delete',
        url: `/api/taggings`,
        data: tagging
    })
);

