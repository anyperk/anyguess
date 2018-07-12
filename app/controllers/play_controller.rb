class PlayController < ApplicationController
  before_action :authentication_required!
  layout 'minimal'

  def index
    @games = Game.all
  end

  def show
    @game    = Game.find(params[:id])
    @players = @game.players
    playing  = @players.select { |u| u.id == current_user.id }.count > 0
    unless playing
      @players.create(user: current_user)
    end
  end
end
