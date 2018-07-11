Rails.application.routes.draw do
  resources :questions
  resources :users
  resources :games
  resources :play
  resources :sessions, only: [:new, :create, :destroy] do
    collection do
      get :logout
    end
  end

  root 'play#index'
end
