class RidersController < ApplicationController
    skip_before_action :logged_in?, only: [:create, :login, :index, :update]

    def index
        @riders = Rider.all

        render json: @riders
    end

    def show
        @rider = Rider.find(params[:id])

        render json: @rider
    end

    def new
        @rider = Rider.new
    end

    def create
        @rider = Rider.create(rider_params)

        if @rider.valid?
            render json: @rider
        else
            render json: {error: "Unable to create this user."}
        end
    end

    def update
        @rider = Rider.find(params[:id])
        @rider.update(rating: params[:rating])
        @rider.update(rides_completed: params[:rides_completed])

        render json: @rider
    end

    def login
        rider = Rider.find_by(email: params[:email])

        if rider && rider.authenticate(params[:password])
            render json: {current_user: current_user, rider_id: rider.id, email: rider.email, token: encode_token({rider_id: rider.id}), message: "Logging in!"}
        else
            render json: {message: "Wrong username or password"}
        end
    end


    private

    def rider_params
        params.permit(:name, :email, :password, :rating, :rides_completed)
    end

end
