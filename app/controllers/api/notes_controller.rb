class Api::NotesController < ApplicationController

    # SORT_TYPES = [
    #         'Date created: Most to least recent',
    #         'Date created: Least to most recent',
    #         'Date updated: Most to least recent',
    #         'Date updated: Least to most recent',
    #         'Title: A to Z',
    #         'Title: Z to A'
    #     ]
    
    # def note_sorter(notes)
    #     sort_index = SORT_TYPES.index(current_user.note_sort_order)
    #     case sort_index
    #     when 0
    #         notes.sort {|note| note.created_at}
    #     when 1
    #         notes.sort {|a , b| b.created_at <=> a.created_at}
    #     when 2
    #         notes.sort {|a , b| a.updated_at <=> b.updated_at}
    #     when 3
    #         notes.sort {|a , b| b.updated_at <=> a.updated_at}
    #     when 4
    #         notes.sort {|a , b| a.title <=> b.title}
    #     when 5
    #         notes.sort {|a , b| b.title <=> a.title}
    #     end
    # end

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
    end

    def empty_trash
        @notes = current_user.notes.where.not(deleted_at: nil)
        @notes.destroy_all
        render :index
    end
    def note_params
        params.require(:note).permit(:title, :content, :fav, :deleted_at)
    end
end
