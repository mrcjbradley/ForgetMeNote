class Api::NotebooksController < ApplicationController
    def index
        @notebooks = current_user.notebooks.all
        render :index
    end
end