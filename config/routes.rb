Buzzed::Application.routes.draw do
  root "pages#home"

  get 'search', to: 'search#index'

  devise_for :users

  namespace :admin do
    root "base#index"
    resources :users
  end

  match '*path' => "pages#home", via: [:get]
end
