class CreateRoutes < ActiveRecord::Migration[6.1]
  def change
    create_table :routes do |t|
      t.belongs_to :rider, null: false, foreign_key: true
      t.belongs_to :driver, null: false, foreign_key: true
      t.string :pickup
      t.string :drop_off

      t.timestamps
    end
  end
end
