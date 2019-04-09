class AddColumnToTags < ActiveRecord::Migration[5.2]
  def change
    add_column :tags, :user_id, :integer
    add_index :tags, :user_id
    add_index :tags, [:title, :user_id], unique: true
  end
end
