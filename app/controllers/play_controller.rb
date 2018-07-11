class PlayController < ApplicationController
  before_action :authentication_required!

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end
end
