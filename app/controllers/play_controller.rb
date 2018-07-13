class PlayController < ApplicationController
  before_action :authentication_required!
  layout 'minimal'

  def index
    @games = Game.where(state: 'started').all
  end

  def show
    @game = Game.find(params[:id])
    p = @game.players.find_or_create_by(user: current_user)
    p.viewing = !%w[started].include?(@game.state)
    p.save!

    @players = @game.players.where(viewing: false)
    @viewers = @game.players.where(viewing: true)
  end
end
