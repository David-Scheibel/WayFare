class Rider < ApplicationRecord
    has_secure_password

    has_many :routes
    has_many :drivers, through: :routes

    validates :email, uniqueness: true
end