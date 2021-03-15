json.set! :user do json.extract! user, :id, :email, :image_url, :note_sort_order, :default_notebook_id end

not_deleted =  user.notes.where(deleted_at: nil).order(:deleted_at)
deleted = user.notes.where.not(deleted_at: nil).order(:deleted_at)

json.set! :recentNotes do
    json.set! :currentNoteId, not_deleted.last ? not_deleted.last.id : -1
    json.set! :recentNoteId, not_deleted.last ? not_deleted.last.id  : -1
    json.set! :recentTrashId, deleted.last ? deleted.last.id : -1 
end