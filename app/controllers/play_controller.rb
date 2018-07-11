class PlayController < ApplicationController
  before_action :authentication_required!
  layout 'minimal'

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
    
  end
end
