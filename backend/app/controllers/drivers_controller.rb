class DriversController < ApplicationController
    skip_before_action :logged_in?, only: [:create, :index, :update]

    def index
        @drivers = Driver.all

        render json: @drivers
    end

    def show
        @driver = Driver.find(params[:id])

        render json: @driver
    end

    def new
        @driver = Driver.new
    end

    def create
        @driver = Driver.create(driver_params)
    end

    def update
        @driver = Driver.find(params[:id])
        @driver.update(rating: params[:rating])
        @driver.update(rides_completed: params[:rides_completed])

        render json: @driver
    end

    
    private

    def driver_params
        params.require(:driver).permit!
    end

end
