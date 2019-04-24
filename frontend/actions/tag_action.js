import * as TagsAPIUtil from '../util/tags_api_util';
export const [
    RECEIVE_ALL_TAGS,
    RECEIVE_TAG,
    REMOVE_TAG,
    RECEIVE_TAG_ERRORS
] = [
    'RECEIVE_ALL_TAGS',
    'RECEIVE_TAG',
    'REMOVE_TAG',
    'RECEIVE_TAG_ERRORS'
];

const receiveAllTags = ({tags}) => ({
    type: RECEIVE_ALL_TAGS,
    tags
});

const receiveTag = (tag) => ({
    type: RECEIVE_TAG,
    tag
});

const removeTag = ({tagId}) => ({
    type: REMOVE_TAG,
    tagId
});

const receiveTagErrors = ({ errors }) => ({
    type: RECEIVE_TAG_ERRORS,
    errors
}); 

export const fetchAllTags = () => dispatch => (
    TagsAPIUtil.fetchAllTags()
     .then(tags => dispatch(receiveAllTags(tags)),
         errors => dispatch(receiveTagErrors(errors.responseJSON)))
);

export const postTag = tag => dispatch => (
    TagsAPIUtil.postTag(tag)
     .then(tag => dispatch(receiveTag(tag)),
         errors => dispatch(receiveTagErrors(errors.responseJSON)))
);

export const patchTag = tag => dispatch => (
    TagsAPIUtil.patchTag(tag)
     .then(tag => dispatch(receiveTag(tag)),
         errors => dispatch(receiveTagErrors(errors.responseJSON)))
);

export const deleteTag = tagId => dispatch => (
    TagsAPIUtil.deleteTag(tagId)
     .then((tagId) => dispatch(removeTag(tagId)),
         errors => dispatch(receiveTagErrors(errors.responseJSON)))
);
