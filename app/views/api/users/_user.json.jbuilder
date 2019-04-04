json.set! :user do json.extract! user, :id, :email, :image_url, :note_sort_order, :default_notebook_id end

json.set! :recentNotes do
json.set! :currentNoteId, user.notes.where(deleted_at: nil).order(:deleted_at).last.id 
json.set! :recentNoteId, user.notes.where(deleted_at: nil).order(:deleted_at).last.id  
json.set! :recentTrashId, user.notes.where.not(deleted_at: nil).order(:deleted_at).last.id  
end