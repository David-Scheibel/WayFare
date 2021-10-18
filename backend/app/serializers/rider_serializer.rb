class RiderSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :email, :rating, :rides_completed, :current_user

end