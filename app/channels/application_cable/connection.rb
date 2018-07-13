module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.name
    end

    def current_user
      session[:current_user_id] && User.find(session[:current_user_id])
    end

    protected

    def find_verified_user
      u = current_user
      if u
        u
      else
        reject_unauthorized_connection
      end
    end

    def session
      key = Rails.application.config.session_options.fetch(:key)
      cookies.encrypted[key]&.symbolize_keys || {}
    end
  end
end
