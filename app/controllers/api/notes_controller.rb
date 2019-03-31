class Api::NotesController < ApplicationController

    def index
        @notes = current_user.notes.all
        render :index
    end

    def create
        @note = current_user.default_notebook.notes.new(note_params)
        if @note.save
            render :show
        else
            render json: { errors: @note.errors.full_messages }, status: 404
        end
    end

    def show
        @note = current_user.notes.find(params[:id])
        if @note
            render :show
        else
            render json: { errors: @note.errors.full_messages }, status: 404
        end
    end

    def update
        @note = current_user.notes.find(params[:id])
        if @note.update(note_params)
            render :show
        else
            render json: { errors: @note.errors.full_messages }, status: 404
        end
    end

    def destroy
        @note = current_user.notes.find(params[:id])
        @note.destroy
        render json: { noteId: @note.id }
}
    end

    def note_params
        params.require(:note).permit(:title, :content, :fav)
    end
end
