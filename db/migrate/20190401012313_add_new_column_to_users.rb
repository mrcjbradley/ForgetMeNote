class AddNewColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :note_sort_order, :string, null: false
  end
end
