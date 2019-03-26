class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.integer :default_notebook_id
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :image_url

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true 
    add_index :users, [:email, :password_digest], unique: true
  end
end
