# == Schema Information
#
# Table name: users
#
#  id                  :bigint(8)        not null, primary key
#  email               :string           not null
#  default_notebook_id :integer
#  password_digest     :string           not null
#  session_token       :string           not null
#  image_url           :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  note_sort_order     :string           not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
