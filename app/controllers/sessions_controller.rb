class SessionsController < ApplicationController

  # GET /sessions/new
  def new
    @user = User.new
  end

  # POST /sessions
  # POST /sessions.json
  def create
    email = params.require(:user)[:email]

    @user = User.find_or_create_by(email: email)
    session[:current_user_id] = @user.id

    redirect_to play_index_path
  end

  # DELETE /sessions
  def destroy
    reset
  end

  # GET /sessions/logout
  # GET /sessions/logout.json
  def logout
    reset
  end

  private

  def reset
    reset_session
    redirect_to root_path
  end
end
