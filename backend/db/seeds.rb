# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "destroying all routes ..."
Route.destroy_all
puts "destroying all riders ..."
Rider.destroy_all
puts "destroying all drivers ..."
Driver.destroy_all

puts "resetting all riders ..."
Rider.reset_pk_sequence
puts "resetting all drivers ..."
Driver.reset_pk_sequence
puts "resetting all routes ..."
Route.reset_pk_sequence

# puts "creating riders ..."
# 1.times do
#   Rider.create(name: Faker::Name.name,
#                rating: Faker::Number.within(range: 2.5..5.0),
#                rides_completed: Faker::Number.between(from: 10, to: 200),
#                email: Faker::Internet.email)
# end

puts "creating drivers ..."
10.times do
  Driver.create(name: Faker::Name.name,
                rating: Faker::Number.within(range: 2.5..5.0),
                rides_completed: Faker::Number.between(from: 25, to: 50),
                email: Faker::Internet.email)
end

# puts "creating routes ..."
# 20.times do
#   Route.create(
#     pickup: Faker::Address.full_address,
#     drop_off: Faker::Address.full_address,
#     rider_id: Rider.ids.sample,
#     driver_id: Driver.ids.sample,
#   )
# end

# Rider.create(name: "Seth McLovin", rating: 1.20, rides_completed: 20, email: "mcLovin@hotbitties.com", password: Faker::Internet.password)

# Driver.create(name: "Shaquille O'Neal", rating: 4.85, rides_completed: 50, email: "shaqstack@papajohns.com")

Rider.create(name: "Sean King", rating: 2.35, rides_completed: 10, email: "TheKing@hotbitties.com", password: Faker::Internet.password)

# Driver.create(name: "Patrick O'houlihan", rating: 4.85, rides_completed: 50, email: "if_you_can_dodge_a_wrench@youcandodgeaball.com")