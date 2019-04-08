class CreateTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :taggings do |t|
      t.integer :note_id, null: false
      t.integer :tag_id, null: false
      t.index :note_id
      t.index :tag_id
      t.index [:note_id, :tag_id], unique: true

      t.timestamps
    end
  end
end
