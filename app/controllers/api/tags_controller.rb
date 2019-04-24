class Api::TagsController < ApplicationController
    def create
    	tag_base = {title: tag_params[:title], fav: tag_params[:fav]}
    	@note = tag_params[:note_id] ? Note.find(tag_params[:note_id]) : nil 
        @tag = current_user.tags.new(tag_base)
        if @tag.save
            if @note 
                Tagging.create(tag_id: @tag.id, note_id: @note.id)
                # render 'api/notes/show'
            # else    
        end
        render :show
        else
           render json: { errors: @tag.errors.full_messages }, status: 404 
        end
    end

    def destroy
        @tag = current_user.tags.find(params[:id])
        @tag.destroy
        render json: { tagId: @tag.id }
    end

    def update
        @tag = current_user.tags.find(params[:id])
        if @tag.update(tag_params)
            render :show
        else
            render json: { errors: @tag.errors.full_messages }, status: 404
        end
    end

    def index 
        @tags = current_user.tags.all 
    end

    def tag_params 
        params.require(:tag).permit(:title, :fav, :note_id)
    end
end
