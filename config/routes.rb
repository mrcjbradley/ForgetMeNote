Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [ :create , :update]
    resource :session, only: [ :create, :destroy ]
    patch '/valid_email', to: 'users#valid_email'
    resources :notes, except: [:new, :edit] 
    resources :tags, only: [:create, :update, :destroy, :index] do
      delete '/taggings', to: 'taggings#remove_all_notes'
    end
    resources :taggings, only: [:create]
     delete '/taggings', to: 'taggings#destroy'
    delete '/trash/empty_trash', to: 'notes#empty_trash'

  end
end
