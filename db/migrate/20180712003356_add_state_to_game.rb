class AddStateToGame < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :state, :string, after: :desc, default: 'new'
  end
end
