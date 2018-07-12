class Game < ApplicationRecord
  has_many :questions, dependent: :delete_all
  has_many :players
  has_many :users, through: :players, dependent: :delete_all
end
