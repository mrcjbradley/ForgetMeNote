# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ActiveRecord::Base.transaction do
    Notebook.destroy_all
    Note.destroy_all
    User.destroy_all


    seed_users = []
    1.upto(5) {|i| seed_users.push(User.create(email: "user#{i}@e.mail", password: "password"))}
    seed_users.push(User.create(email: "demo@user.login", password: "banana"))

    seed_users.each do |user| 
        5.times do 
            nb = user.default_notebook
            nb.notes.create(title: Faker::TvShows::DrWho.catch_phrase , content: Faker::TvShows::DrWho.quote ) 
        end
    end

end


