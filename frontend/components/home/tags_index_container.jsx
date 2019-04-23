import React from 'react';
import { connect } from 'react-redux';
import TagsIndex from './tags_index';
import { 
    fetchAllTags,
    postTag,
    patchTag,
    deleteTag
 } from '../../actions/tag_action';
 import { removeAllNotesFromTag } from '../../actions/tagging_actions';
 import { openModal, receiveFilter } from '../../actions/ui_actions';
import { values } from 'lodash';

const msp = ({entities: {tags}, ui:{modal:{open}}}) => {
    const alphaTags = {};
    for (let n = 0; n < 26; n++) {
        const letter = String.fromCharCode(97+n);
        alphaTags[letter] = _.values(tags).filter(tag => tag.title[0].toLowerCase() === letter);
    }
    // debugger
    return({
    // tagCount: _.values.tags ? _values.tags.length : 0,
    tags: alphaTags,
    open
});};

const mdp = dispatch => ({
    fetchAllTags: () => dispatch(fetchAllTags()),
    openModal: modal => dispatch(openModal(modal)),     
    postTag: tag => dispatch(postTag(tag)),
    receiveFilter: filters => dispatch(receiveFilter(filters)),
    patchTag: tag => dispatch(patchTag(tag)),
    deleteTag: tagId => dispatch(deleteTag(tagId)),
    removeAllNotesFromTag: tadId => dispatch(removeAllNotesFromTag(tagId))
});

export default connect(msp,mdp)(TagsIndex);