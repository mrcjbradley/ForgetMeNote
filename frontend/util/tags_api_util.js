export const fetchAllTags = () => (
    $.ajax({
        method: 'get',
        url: '/api/tags'
    })
);

export const postTag = tag => (
    $.ajax({
        method: 'post',
        url: '/api/tags',
        data: tag
    })
);

export const patchTag = tag => (
    $.ajax({
        method: 'patch',
        url: `/api/tags/${tag.id}`,
        data: tag
    })
);

export const deleteTag = tagId => (
    $.ajax({
        method: 'delete',
        url: `/api/tags/${tagId}`
    })
);
