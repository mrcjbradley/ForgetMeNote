json.extract! note, 
    :id, 
    :title,
    :content,
    :plain_text,
    :notebook_id, 
    :created_at, 
    :updated_at, 
    :deleted_at, 
    :fav
json.tag_ids note.tags.pluck(:id)
