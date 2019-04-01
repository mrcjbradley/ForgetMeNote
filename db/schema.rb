# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_01_012313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "notebooks", force: :cascade do |t|
    t.string "title", null: false
    t.integer "author_id", null: false
    t.boolean "fav"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_notebooks_on_author_id"
  end

  create_table "notes", force: :cascade do |t|
    t.string "title", null: false
    t.text "content"
    t.datetime "deleted_at"
    t.boolean "fav"
    t.integer "notebook_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["notebook_id"], name: "index_notes_on_notebook_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.integer "default_notebook_id"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "note_sort_order", null: false
    t.index ["default_notebook_id"], name: "index_users_on_default_notebook_id"
    t.index ["email", "password_digest"], name: "index_users_on_email_and_password_digest", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
