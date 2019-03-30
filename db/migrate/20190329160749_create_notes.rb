class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :content
      t.datetime :deleted_at
      t.boolean :fav
      t.integer :notebook_id, null: false
      t.index :notebook_id

      t.timestamps
    end
  end
end
