import React from "react";
import NoteIndexItem from "./note_index_item";
import NoteOptionsSortMenu from "./note_options_sort_menu";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import NoteDetail from "./note_detail_container";
import { mostRecentlyUpdatedNote } from "../../../util/selectors";

class NoteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMenu: false,
      notes: this.props.notes,
      mostRecentId: this.props.mostRecentId,
      tagsVisibile: false,
      searchString: ""
    };

    this.toggleSortDisplay = this.toggleSortDisplay.bind(this);
    this.handleEmptyTrash = this.handleEmptyTrash.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.toggleTagOptionsVisible = this.toggleTagOptionsVisible.bind(this);
    this.handleTagSearchChange = this.handleTagSearchChange.bind(this);
  }

  componentDidMount() {
    const { getAllNotes } = this.props;
    getAllNotes();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      this.setState({
        notes: this.props.notes,
        mostRecentId: this.props.mostRecentId
      });
    }
  }

  componentDidUpdate(prevProps) {
    $(".NoteItem").removeClass("active");
    $(".NoteItem a.active")
      .parent()
      .toggleClass("active");
    if (prevProps.notes !== this.props.notes) {
      this.setState({
        notes: this.props.notes,
        mostRecentId: this.props.mostRecentId
      });
    }
  }

  clearFilter() {
    const { removeTagFilter } = this.props;
    removeTagFilter();
  }

  handleMouseEnter(e) {
    $(e.target).addClass("grey");
  }

  handleMouseLeave(e) {
    $(e.target).removeClass("grey");
  }

  toggleSortDisplay(e) {
    this.setState({ sortMenu: !this.state.sortMenu });
  }

  toggleTagOptionsVisible(e) {
    $(".tagFilterSearch").toggle();
    $(".clickOutWrapper.tagOptions").toggle();
    $(".tagSearch input").focus();
    //  this.setState({ tagsVisible: !this.state.tagsVisibile});
  }

  handleEmptyTrash(e) {
    e.preventDefault();
    this.props.emptyTrash();
  }

  orderNoteIndexItems(notes) {
    if (notes.length < 1) return notes;
    const orderTypes = [
      "Date created: Most to least recent",
      "Date created: Least to most recent",
      "Date updated: Most to least recent",
      "Date updated: Least to most recent",
      "Title: A to Z",
      "Title: Z to A"
    ];
    const { note_sort_order } = this.props;
    const chosen = orderTypes.indexOf(note_sort_order);

    switch (chosen) {
      case 0:
        return notes.sort((n1, n2) => {
          const d1 = new Date(n1.created_at);
          const d2 = new Date(n2.created_at);
          return d2 - d1;
        });
      case 1:
        return notes.sort((n1, n2) => {
          const d1 = new Date(n1.created_at);
          const d2 = new Date(n2.created_at);
          return d1 - d2;
        });
      case 2:
        return notes.sort((n1, n2) => {
          const d1 = new Date(n1.updated_at);
          const d2 = new Date(n2.updated_at);
          return d2 - d1;
        });
      case 3:
        return notes.sort((n1, n2) => {
          const d1 = new Date(n1.updated_at);
          const d2 = new Date(n2.updated_at);
          return d1 - d2;
        });
      case 4:
        return notes.sort((n1, n2) => {
          const t1 = n1.title ? n1.title.toLowerCase() : "";
          const t2 = n2.title ? n2.title.toLowerCase() : "";
          if (t1 < t2) return -1;
          if (t1 > t2) return 1;
          return 0;
        });
      case 5:
        return notes.sort((n1, n2) => {
          const t1 = n1.title ? n1.title.toLowerCase() : "";
          const t2 = n2.title ? n2.title.toLowerCase() : "";
          if (t1 < t2) return 1;
          if (t1 > t2) return -1;
          return 0;
        });
      default:
        return notes;
    }
  }

  handleTagSearchChange(e) {
    this.setState({ searchString: e.target.value });
  }

  render() {
    // if (this.state.notes.length === 0) return null;

    const { notes, fullscreen, headerText, mostRecentId } = this.props;
    const { sortMenu } = this.state;
    // const activeSignifier = headerText === 'Trash' ? recentTrashId : recentNoteId ;
    let noteItems;
    if (this.state.notes.length > 0) {
      noteItems = this.orderNoteIndexItems(this.props.notes).map(note => {
        return note.id === -1 ? null : (
          <NoteIndexItem note={note} key={note.id} />
        );
      });
    } else {
      noteItems = [];
    }

    const emptyTrashBtn = (
      <Link to="#" className="emptyTrashBtn" onClick={this.handleEmptyTrash}>
        empty trash
      </Link>
    );

    const currentTagDiv = () => {
      if (this.props.filterTags === null || headerText === "Trash") return null;

      return (
        <div className="NoteIndex_FiltersTags">
          <div className="FiltersTags_CurrentTag">
            {this.props.filterTags ? this.props.filterTags.title : ""}{" "}
            <span className="removeTagBtn" onClick={this.clearFilter}>
              X
            </span>
          </div>
        </div>
      );
    };

    let mostRecent;
    if (this.state.notes.length > 0) {
      mostRecent = this.state.notes.filter(
        note => note.id === parseInt(mostRecentId)
      );
    } else {
      mostRecent = null;
    }

    const tagList = () => {
      if (headerText === "Trash") {
        return null;
      } else {
        const searchString = this.state.searchString;
        const { tags } = this.props;
        const titleLength = searchString.length;
        const searchTagResults =
          titleLength > 0
            ? this.props.tags.filter(
                tag =>
                  tag.title.slice(0, titleLength).toLowerCase() ===
                  searchString.toLowerCase()
              )
            : [];
        const tagsToUse =
          searchTagResults.length === 0 ? this.props.tags : searchTagResults;
        return tagsToUse.map((tag, idx) => {
          return (
            <li
              className={`NoteIndex-TagListItem tag-${tag.id}`}
              key={idx}
              onClick={e => {
                this.toggleTagOptionsVisible();
                this.setState({ searchString: "" });
                $(".tagSearch input").val("");
                this.props.receiveFilter({ tags: tag.id });
              }}
            >
              {tag.title}
            </li>
          );
        });
      }
    };

    const tagsIcon = (
      <nav className="NoteIndex_NoteTags">
        <div
          className="bg--tag-icon"
          onClick={this.toggleTagOptionsVisible}
        ></div>
        <div
          className="clickOutWrapper tagOptions"
          style={{ display: "none" }}
          onClick={this.toggleTagOptionsVisible}
        ></div>
        <ul
          className="tagFilterSearch"
          style={{ display: this.state.tagsVisibile ? "inherit" : "none" }}
        >
          <li className="NoteIndex-TagListItem tagSearch">
            <input type="text" onChange={this.handleTagSearchChange} />
          </li>
          {tagList()}
        </ul>
      </nav>
    );
    return (
      <>
        <aside className={fullscreen ? "NoteIndex hide-me" : "NoteIndex"}>
          <header className="NoteIndex_NoteIndexHeader">
            <div className="NoteIndex_NoteIndexTitle">
              <h1 className="">{headerText}</h1>
              {headerText === "Trash" && noteItems[0] !== null
                ? emptyTrashBtn
                : null}
            </div>
            <div className="NoteIndex_NoteIndexDetails">
              <span className="NoteIndex_NoteCount">
                {noteItems[0] === null ? "0" : notes.length} notes
              </span>
              <div className="NoteIndex_NoteTagsOptions">
                <nav className="NoteIndex_NoteOptions">
                  <div
                    onClick={this.toggleSortDisplay}
                    className="bg--option-dd-icon"
                  ></div>
                  {sortMenu ? (
                    <NoteOptionsSortMenu
                      toggleSortDisplay={this.toggleSortDisplay}
                    />
                  ) : null}
                </nav>
                {headerText === "Trash" ? null : tagsIcon}
              </div>
            </div>
            {currentTagDiv()}
          </header>
          <ul className="NoteIndex_NoteRoll">{noteItems}</ul>
        </aside>
        <NoteDetail
          notes={this.props.notes}
          note={mostRecent ? mostRecent[0] : this.props.fillerNote}
        />
      </>
    );
  }
}
export default NoteIndex;
