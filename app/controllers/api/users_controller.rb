class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            @user.update(default_notebook: @user.notebooks.create(title: 'First Notebook'))
            log_in!(@user)
            render :show
        else
            render json: { errors: @user.errors.full_messages } , status: 404
        end
    end

    def valid_email
        @user = User.find_by(email: params[:email])
        if @user
            render json: { validEmail: @user.email }
        else
            render json: { errors: ['There is no account for the email you entered.'] }, status: 404
            # Evernote's error message 'There is no account for the username or email you entered.'
        end
    end

    def update
        if logged_in?
            @user = current_user
            if @user.update(user_params)
                render :show
            else
                render json: { errors: @user.errors.full_messages } , status: 404
            end
        else
            render json: { errors: ['Invalid credentials.']}, status: 401
        end
    end

    def user_params
        params.require(:user).permit(:email, :password, :default_notebook_id, :note_sort_order)
    end
end
