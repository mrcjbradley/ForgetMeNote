 import { intersection } from 'lodash';
 export const orderNoteIndexItems = (notes, note_sort_order) => {

     const orderTypes = [
         'Date created: Most to least recent',
         'Date created: Least to most recent',
         'Date updated: Most to least recent',
         'Date updated: Least to most recent',
         'Title: A to Z',
         'Title: Z to A'
     ];
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
                 const t1 = n1.title.toLowerCase();
                 const t2 = n2.title.toLowerCase();
                 if (t1 < t2) return -1;
                 if (t1 > t2) return 1;
                 return 0;
             });
         case 5:
             return notes.sort((n1, n2) => {
                 const t1 = n1.title.toLowerCase();
                 const t2 = n2.title.toLowerCase();
                 if (t1 < t2) return 1;
                 if (t1 > t2) return -1;
                 return 0;
             });
         default:
             return notes;
     }

 };

 export const newestNote = (notes) => {
    return orderNoteIndexItems(notes, 'Date created: Most to least recent')[0]; 
 }; 

 export const mostRecentlyUpdatedNote = (notes) => {
    return orderNoteIndexItems(notes, 'Date updated: Most to least recent')[0]; 
 }; 

 export const secondMostRecentlyUpdatedNote = (notes) => {
    return orderNoteIndexItems(notes, 'Date updated: Most to least recent')[1]; 
 }; 

 export const deletedNotes = (notes) => {

    return notes.filter(note => note.deleted_at !== null);
 };

 export const notDeletedNotes = (notes) => {
    return notes.filter(note => note.deleted_at === null);
 };

 export const tagsFilter = (notes, tagIds) => {
    if (tagIds.length === 0){
        return notes;
    } else {
        // const filterNotes = [];
        // for (let i = 0; i < notes.length; i++) {
        //     const note = notes[i];
        //         for (let idx = 0; idx < note.tag_ids.length; idx++) {
        //             const tag_id = note.tag_ids[idx];
        //             if (tagIds.includes(tag_id)){
        //             filterNotes.push(note);
        //         }
        //     }
        // }
        // return filterNotes;

        return notes.filter( note => _.intersection(note.tag_ids, tagIds).length > 0 );
    }
 };