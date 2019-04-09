import React from 'react';
import { connect } from 'react-redux';
import TagsIndex from './tags_index';
import { fetchAllTags } from '../../actions/tag_action';
import { values } from 'lodash';

const msp = ({entities: {tags}}) => {
    const alphaTags = {};
    for (let n = 0; n < 25; n++) {
        const letter = String.fromCharCode(97+n);
        alphaTags[letter] = _.values(tags).filter(tag => tag.title[0].toLowerCase() === letter);
    }
    return({
    tags: alphaTags
});};

const mdp = dispatch => ({
    fetchAllTags: () => dispatch(fetchAllTags())
});

export default connect(msp,mdp)(TagsIndex);