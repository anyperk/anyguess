class HomeController < ApplicationController
  before_action :authentication_required!
  layout 'minimal'

  def index
  end
end
