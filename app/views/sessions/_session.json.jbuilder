json.extract! session, :id, :email, :created_at, :updated_at
json.url session_url(session, format: :json)
