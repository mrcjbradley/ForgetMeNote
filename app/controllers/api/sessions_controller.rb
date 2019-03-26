class Api::SessionsController < ApplicationController

    def create
        debugger
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user
            log_in!(@user)
            render 'api/users/show'
        else
            render json: { errors: ['Incorrect password.'], status: 404}  
            # Evernote's Error Message ['Incorrect password. You modified your password 1,077 days ago.']
        end
    end



    def destroy
        if logged_in?
            log_out!
            render json: {}
        else
            render json: { errors: ['No logged in user.'], status: 404} 
        end
    end

    
end
