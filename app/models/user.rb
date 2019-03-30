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
#

class User < ApplicationRecord
    validates :email, :session_token, :password_digest, presence: true
    validates :email, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }
    validates :email, :session_token, uniqueness: true
    validates :password, length: { minimum: 6}, allow_nil: true

    after_initialize :ensure_session_token #, :first_notebook 
    # after_save :first_notebook
    attr_reader :password
    # attr_reader :default_notebook

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def password=(pw)
        @password = pw
        self.update(password_digest: BCrypt::Password.create(pw))
    end

    def is_password?(pw)
        bc_pw = BCrypt::Password.new(self.password_digest)
        bc_pw.is_password?(pw)        
    end

    def self.find_by_credentials(email, pw)
        user = User.find_by(email: email)
        user && user.is_password?(pw) ? user : nil
    end

    def reset_session_token!
        self.update(session_token: User.generate_session_token)
        self.session_token
    end

    has_many :notebooks, foreign_key: :author_id, class_name: :Notebook
    has_many :notes, through: :notebooks
    belongs_to :default_notebook, foreign_key: :default_notebook_id, class_name: :Notebook, optional: true, inverse_of: :default_for_author
       
    # def ensure_default_notebook
    #     self.default_notebook ||= User.first_notebook
    # end

    def first_notebook

        self.default_notebook ||= self.notebooks.create(title: 'First Notebook')
  
    end


    # has_many :tags, foreign_key: :author_id
    # has_many :reminders
end
