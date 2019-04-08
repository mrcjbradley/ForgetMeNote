# == Schema Information
#
# Table name: tags
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  fav        :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord
    validates :title, presence: true
    validates :fav, inclusion: { in: [true, false]}

    after_initialize :ensure_fav

    def ensure_fav
        self.fav = self.fav || "false"
    end

    has_many :taggings
    has_many :notes, through: :taggings
    has_many :notebooks, through: :notes
    has_many :author, through: :notebooks
end
