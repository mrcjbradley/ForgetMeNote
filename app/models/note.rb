# == Schema Information
#
# Table name: notes
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  content     :text
#  deleted_at  :datetime
#  fav         :boolean
#  notebook_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  plain_text  :string
#

class Note < ApplicationRecord
    validates :title, presence: true
    validates :fav, inclusion: { in: [true, false]}

    after_initialize :ensure_title, :ensure_fav
    before_save :ensure_plain_text

    def ensure_title
        self.title = self.title || "untitled"
    end
    
    def ensure_fav
        self.fav = self.fav || "false"
    end

    def ensure_plain_text
        if self.content
            self.plain_text = self.plain_text ? self.plain_text : self.content
        end
    end

    belongs_to :notebook
    has_one :author, through: :notebook
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings
    
    # has_one :reminder
end
