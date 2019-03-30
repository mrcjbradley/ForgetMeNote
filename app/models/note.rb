# == Schema Information
#
# Table name: notes
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  content     :text
#  deleted_at  :datetime
#  fav         :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  notebook_id :integer          not null
#


class Note < ApplicationRecord
    validates :title, presence: true
    validates :fav, inclusion: { in: [true, false]}

    after_initialize :ensure_title, :ensure_fav

    def ensure_title
        self.title = self.title || "untitled"
    end
    
    def ensure_fav
        self.fav = self.fav || "false"
    end

    belongs_to :notebook
    has_one :author, through: :notebook
    
    # has_one :reminder
    # has_many :taggings
    # has_many :tags, through: taggings
end
