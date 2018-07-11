class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.string :text
      t.string :answer1
      t.string :answer2

      t.timestamps
    end
  end
end
