

@notes.each do |note|
    json.set! note.id do
        json.partial! 'api/notes/note', note: note
    end
end
json.set! :activeNotes, @notes.where(deleted_at: nil).order(updated_at: :DESC).pluck(:id)
json.set! :trashedNotes, @notes.where.not(deleted_at: nil).order(deleted_at: :DESC).pluck(:id)