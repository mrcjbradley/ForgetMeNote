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

require 'test_helper'

class TagTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
