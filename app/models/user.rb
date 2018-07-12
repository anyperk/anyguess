class User < ApplicationRecord
  has_many :games, through: :players
end
