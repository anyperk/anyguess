Rails.application.routes.draw do

  resources :questions
  resources :users
  resources :games do
    post :ask
  end
  resources :play
  resources :sessions, only: [:new, :create, :destroy] do
    collection do
      get :logout
    end
  end

  get 'home', to: 'home#index'
  root 'home#index'
  mount ActionCable.server => '/cable'
end
