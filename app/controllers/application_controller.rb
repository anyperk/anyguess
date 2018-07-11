class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  ApplicationNotAuthenticated = Class.new(StandardError)
  ApplicationNotAdmin = Class.new(StandardError)

  rescue_from ApplicationNotAuthenticated,ApplicationNotAdmin do
    respond_to do |format|
      format.json { render json: { errors: [message: "401 Not Authorized"] }, status: 401 }
      format.html do
        flash[:notice] = "Not Authorized to access this page, plese log in"
        redirect_to new_session_path
      end
      format.any { head 401 }
    end
  end

  def authentication_required!
    session[:current_user_id] || raise(ApplicationNotAuthenticated)
  end

  def admin_required!
    current_user && current_user.role == 'admin' || raise(ApplicationNotAdmin)
  end

  def current_user
    @current_user ||= session[:current_user_id] && User.find(session[:current_user_id])
  end
end
