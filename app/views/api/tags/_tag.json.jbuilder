json.extract! tag, :id, :title, :fav
json.note_ids tag.notes.pluck(:id)
