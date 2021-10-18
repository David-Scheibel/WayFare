class CreateRiders < ActiveRecord::Migration[6.1]
  def change
    create_table :riders do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.float :rating
      t.integer :rides_completed

      t.timestamps
    end
  end
end
