# == Schema Information
#
# Table name: notebooks
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  fav        :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Notebook < ApplicationRecord
    validates :title, :author_id, presence: true
    validates :fav, :fav, inclusion: {in: [true, false]}

    after_initialize :ensure_title, :ensure_fav, 

    def ensure_title
        self.title = self.title || "untitled"
    end
    
    def ensure_fav
        self.fav = self.fav || false
    end

    belongs_to :author, foreign_key: :author_id, class_name: :User
    has_many :notes
    has_one :default_for_author, foreign_key: :default_notebook_id, primary_key: :id, class_name: :User
end
