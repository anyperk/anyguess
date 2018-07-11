Rails.application.routes.draw do
  get 'play/index'

  get 'play/show'

  resources :questions
  resources :users
  resources :games
  resources :play
  resources :sessions, only: [:new, :create, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
