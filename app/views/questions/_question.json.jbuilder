json.extract! question, :id, :game_id, :text, :answer1, :answer2, :created_at, :updated_at
json.url question_url(question, format: :json)
