class Api::TaggingsController < ApplicationController
    def remove_all_notes 
        @tag = current_user.tags.find(params[:tag_id]) 
        @notes = current_user.notes
        if @tag
            @tag.taggings.destroy_all
            render 'api/notes/index'
        end
    end

    def create 
        # debugger
        @tagging = Tagging.create(tagging_params)
        if @tagging
        	@notes = current_user.notes
        	render 'api/notes/index'
        end
    end

    def destroy
        @tagging = Tagging.find_by(tag_id: tagging_params[:tag_id], note_id: tagging_params[:note_id])
        if @tagging
        	@tagging.destroy
        	@notes = current_user.notes
        	render 'api/notes/index'
        end
    end

    def tagging_params 
        params.require(:tagging).permit(:tag_id, :note_id) 
    end
end