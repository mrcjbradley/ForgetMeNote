import React from 'react';
import { connect } from 'react-redux';
import { patchTag, deleteTag } from '../../actions/tag_action';
import {withRouter} from 'react-router-dom';
import TagOptionsMenu from './tag_options';


const msp = (state, { tag, toggleTagOptionsDisplay, history, handleUpdateTag, handleDeleteTag }) => ({
    tag,
    toggleTagOptionsDisplay,
    handleUpdateTag,
    handleDeleteTag,
    history
});

const mdp = dispatch => ({
    patchTag: tag => dispatch(patchTag(tag)), 
    deleteTag: tagId => dispatch(deleteTag(tagId))
});
const connectedComp = connect(msp, mdp)(TagOptionsMenu);
export default withRouter(connectedComp);

