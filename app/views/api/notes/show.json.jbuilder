json.notes do 
    json.set! @note.id do 
        json.partial! 'api/notes/note', note: @note 
    end
end

json.tags do 
    @note.tags.each do |tag|
        json.set! tag.id do
            json.partial! 'api/tags/tag', tag: tag 
        end
    end
end

