# ForgetMeNote

[ForgetMeNote](https://forgetmenote.herokuapp.com/) is a clone of [Evernote](https://evernote.com/), a cloud-based note-taking app. 

## Technologies

ForgetMeNote is built using 
- `React.js` 
- `React-Quill`
- `Redux.js` 
- `Javascript` 
- `jQuery`
- `Ruby on Rails`
- `Postgresql`
- `Heroku`

## Features

UX was a key consideration in cloning Evernote, which comprises a number of subtle transitions to signify successful validations or entrance into a new mode (e.g. editing vs. reading of a note, active vs. trashed notes) to the user.

### Dynamic Login UX

The login form utilizes a two-step validation to (1) confirm that a user with the entered email address exists in the database and (2) check that the correct password was provided. Only if a user provides a valid email address does the password field appear and the 'continue' button becomes a 'sign in' button.

![login demo](https://github.com/mrcjbradley/ForgetMeNote/blob/master/app/assets/images/login.gif?raw=true "Login Demo")

### Notes
 Users can add, update and move notes to trash, as well as empty the trash of all existing notes. A combination of a comprehensive UI slice of front-end state and integration of the `React-Router-Dom API` ensure a user's most recently updated note is always displayed.

### Rich Text Editor
ForgetMeNote uses [React-Quill](https://github.com/zenoamaro/react-quill) to provide a rich text editor for notes. The rich text editor is toggled on or off depending on whether or not the user is in active notes view or in trashed notes view, and where the user's focus is (on the note or on another component). Notes are updated onBlur.

### Future Additions
#### Notebooks
Users will be able to add, update, and remove notebooks (in addition to the default notebook that is created when a new user is registered).
<<<<<<< HEAD
#### Tags
=======

#### Tags
Users will be able to create new tags, tag notes, and update/delete existing tags.
>>>>>>> ceb447628b577babc6d224bd013c143500f8fa9d
