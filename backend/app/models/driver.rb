class Driver < ApplicationRecord
    has_many :routes
    has_many :riders, through: :routes
end
