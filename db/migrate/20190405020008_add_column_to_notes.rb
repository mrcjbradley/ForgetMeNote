class AddColumnToNotes < ActiveRecord::Migration[5.2]
  def change
    add_column :notes, :plain_text, :string
  end
end
