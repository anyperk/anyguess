module ApplicationHelper
  def current_user
    @current_user ||= session[:current_user_id] && User.find(session[:current_user_id])
  end

  def gravatar_url(email, size = 32)
    gravatar = Digest::MD5::hexdigest(email).downcase
    "http://gravatar.com/avatar/#{gravatar}.png?s=#{size}&d=robohash"
  end

  def avatar(email, size = 32)
    g = gravatar_url(email, size)
    # if g == "blarg"
    #   render partial: 'users/avatar'
    # else
    image_tag g, alt: current_user.email
    # end
  end
end
