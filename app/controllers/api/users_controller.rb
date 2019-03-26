class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            render :show
        else
            render json: { errors: @user.errors }
        end
    end

    def valid_email
        @user = User.find_by(email: params[:email])
        if @user
            render json: { validEmail: true }
        else
            render json: { errors: ['There is no account for the email you entered.'] }
            # Evernote's error message 'There is no account for the username or email you entered.'
        end
    end

    def user_params
        params.require(:user).permit(:email, :password)
    end
end
