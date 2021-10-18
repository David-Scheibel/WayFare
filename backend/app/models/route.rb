class Route < ApplicationRecord
  belongs_to :rider
  belongs_to :driver
end
