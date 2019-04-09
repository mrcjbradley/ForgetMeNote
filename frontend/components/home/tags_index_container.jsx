import React from 'react';
import { connect } from 'react-redux';
import TagsIndex from './tags_index';
import { 
    fetchAllTags,
    postTag
 } from '../../actions/tag_action';
 import { openModal } from '../../actions/ui_actions';
import { values } from 'lodash';

const msp = ({entities: {tags}, ui:{modal:{open}}}) => {
    const alphaTags = {};
    for (let n = 0; n < 25; n++) {
        const letter = String.fromCharCode(97+n);
        alphaTags[letter] = _.values(tags).filter(tag => tag.title[0].toLowerCase() === letter);
    }
    // debugger
    return({
    tags: alphaTags,
    open
});};

const mdp = dispatch => ({
    fetchAllTags: () => dispatch(fetchAllTags()),
    openModal: modal => dispatch(openModal(modal)),     
    postTag: tag => dispatch(postTag(tag))
});

export default connect(msp,mdp)(TagsIndex);