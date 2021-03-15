json.set! notebook.id do 
    json.extract! notebook, 
        :id, 
        :title,
        :author_id,
        :fav,
        :created_at, 
        :updated_at
end