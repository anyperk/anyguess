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

  # DELETE /sessions/1
  # DELETE /sessions/1.json
  def destroy
    @session.destroy
    respond_to do |format|
      format.html { redirect_to sessions_url, notice: 'Session was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
end
