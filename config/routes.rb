# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                      root GET    /                                                                                        static_pages#root
#                 api_users POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                  api_user PATCH  /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                           PUT    /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#           api_valid_email PATCH  /api/valid_email(.:format)                                                               api/users#valid_email {:format=>:json}
#                 api_notes GET    /api/notes(.:format)                                                                     api/notes#index {:format=>:json}
#                           POST   /api/notes(.:format)                                                                     api/notes#create {:format=>:json}
#                  api_note GET    /api/notes/:id(.:format)                                                                 api/notes#show {:format=>:json}
#                           PATCH  /api/notes/:id(.:format)                                                                 api/notes#update {:format=>:json}
#                           PUT    /api/notes/:id(.:format)                                                                 api/notes#update {:format=>:json}
#                           DELETE /api/notes/:id(.:format)                                                                 api/notes#destroy {:format=>:json}
#          api_tag_taggings DELETE /api/tags/:tag_id/taggings(.:format)                                                     api/taggings#remove_all_notes {:format=>:json}
#                  api_tags GET    /api/tags(.:format)                                                                      api/tags#index {:format=>:json}
#                           POST   /api/tags(.:format)                                                                      api/tags#create {:format=>:json}
#                   api_tag PATCH  /api/tags/:id(.:format)                                                                  api/tags#update {:format=>:json}
#                           PUT    /api/tags/:id(.:format)                                                                  api/tags#update {:format=>:json}
#                           DELETE /api/tags/:id(.:format)                                                                  api/tags#destroy {:format=>:json}
#              api_taggings POST   /api/taggings(.:format)                                                                  api/taggings#create {:format=>:json}
#                           DELETE /api/taggings(.:format)                                                                  api/taggings#destroy {:format=>:json}
#     api_trash_empty_trash DELETE /api/trash/empty_trash(.:format)                                                         api/notes#empty_trash {:format=>:json}
#             api_notebooks GET    /api/notebooks(.:format)                                                                 api/notebooks#index {:format=>:json}
#                           POST   /api/notebooks(.:format)                                                                 api/notebooks#create {:format=>:json}
#              api_notebook GET    /api/notebooks/:id(.:format)                                                             api/notebooks#show {:format=>:json}
#                           PATCH  /api/notebooks/:id(.:format)                                                             api/notebooks#update {:format=>:json}
#                           PUT    /api/notebooks/:id(.:format)                                                             api/notebooks#update {:format=>:json}
#                           DELETE /api/notebooks/:id(.:format)                                                             api/notebooks#destroy {:format=>:json}
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

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
    resources :notebooks, except: [:new, :edit]

  end
end
