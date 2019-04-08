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

require 'test_helper'

class NoteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
