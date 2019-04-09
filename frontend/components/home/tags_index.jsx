import React from 'react';
import { keys } from 'lodash';

class TagsIndex extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { fetchAllTags } = this.props;
        fetchAllTags();
    }

    render(){
        const tagKeys = _.keys(this.props.tags);
        const tagList = tagKeys.map((key,idx) => {
            if(this.props.tags[key].length > 0){
                const tagItems = this.props.tags[key].map((tag, tidx) => {
                    return(
                        <li key={tidx}>{tag.title} ({tag.note_count})</li>
                    )
                });
                return(
                <li key={idx}> 
                {key.toUpperCase()}
                <ul key={key}>
                    {tagItems}
                </ul>
            </li>)
            }
        });
        return( 
            <>
            <div className="TagIndex_TagHeader">
                <h1>Tags</h1>
            </div>
            <ul>
                {tagList}
            </ul>
            </>
        );
    }
}

export default TagsIndex;


