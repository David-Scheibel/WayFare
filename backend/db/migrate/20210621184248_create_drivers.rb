class CreateDrivers < ActiveRecord::Migration[6.1]
  def change
    create_table :drivers do |t|
      t.string :name
      t.string :email
      t.float :rating
      t.integer :rides_completed

      t.timestamps
    end
  end
end
