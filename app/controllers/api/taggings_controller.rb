class Api::TaggingsController < ApplicationController
    def remove_all_notes 
        @tag = current_user.tags.find(params[:tag_id]) 
        @notes = current_user.notes
        if @tag
            @tag.taggings.destroy_all
            render 'api/notes/index'
        end
    end
end