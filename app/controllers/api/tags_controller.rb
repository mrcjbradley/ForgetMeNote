class Api::TagsController < ApplicationController
    def create
        @tag = current_user.tags.new(tag_params)
        if @tag.save
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
        params.require(:tag).permit(:title, :fav)
    end
end
