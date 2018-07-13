class LoserChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'loser_channel'
  end

  def lost(data)
    id        = data['game_id']
    p         = Player.where(user_id: current_user.id, game_id: id).first
    if p
      p.viewing = true
      p.save
    else
      puts "lost: couldn't find player: #{data.inspect} #{current_user.inspect}"
    end
    ActionCable.server.broadcast 'loser_channel', { user: current_user }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
