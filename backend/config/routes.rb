Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :routes
  resources :drivers
  resources :riders
  post "/login", to: "riders#login"

end
