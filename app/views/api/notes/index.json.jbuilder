
json.notes do
@notes.each do |note|
    json.set! note.id do
        json.partial! 'api/notes/note', note: note
    end
end
end

json.tags do 
    current_user.tags.each do |tag|
        json.set! tag.id do
            json.partial! 'api/tags/tag', tag: tag 
        end
    end
end

