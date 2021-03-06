class GamesController < ApplicationController
  before_action :authentication_required!
  before_action :admin_required!
  before_action :set_game, only: [:show, :edit, :update, :destroy]

  # GET /games
  # GET /games.json
  def index
    @games = Game.all
  end

  # GET /games/1
  # GET /games/1.json
  def show
  end

  # GET /games/new
  def new
    @game = Game.new
  end

  # GET /games/1/edit
  def edit
  end

  # POST /games
  # POST /games.json
  def create
    @game = Game.new(game_params)

    respond_to do |format|
      if @game.save
        format.html { redirect_to @game, notice: 'Game was successfully created.' }
        format.json { render :show, status: :created }
      else
        format.html { render :new }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /games/1
  # PATCH/PUT /games/1.json
  def update
    respond_to do |format|
      if @game.update(game_params)
        format.html { redirect_to @game, notice: 'Game was successfully updated.' }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render :edit }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy
    @game.destroy
    respond_to do |format|
      format.html { redirect_to games_url, notice: 'Game was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def ask
    @question = Question.find(params[:id])
    ActionCable.server.broadcast 'question_notifications_channel', message: @question
    render json: {}
  end

  def answer
    question = params[:id]
    answer = params[:answer]
    ActionCable.server.broadcast 'question_notifications_channel', message: {answer: answer, question: question}
    render json: {}
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_game
    @game      = Game.find(params[:id])
    @questions = @game.questions
    @question  = Question.new
    @players = @game.players.where(viewing: false)
    @viewers = @game.players.where(viewing: true)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def game_params
    params.require(:game).permit(:name, :desc, :state, :scheduled_at)
  end
end
