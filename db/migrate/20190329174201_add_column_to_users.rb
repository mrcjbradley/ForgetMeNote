class AddColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :default_notebook_id, :integer, null: false
    add_index :users, :default_notebook_id
  end
end
