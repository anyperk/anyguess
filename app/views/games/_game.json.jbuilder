json.extract! game, :id, :name, :desc, :scheduled_at, :created_at, :updated_at
json.url game_url(game, format: :json)
