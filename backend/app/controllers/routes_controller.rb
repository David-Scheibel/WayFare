class RoutesController < ApplicationController
    skip_before_action :logged_in?, only: [:create, :index]

    def index
        @routes = Route.all

        # respond_to do |format|
        #     format.html { render :index }
        #     format.json { render json: @routes }
        # end
        render json: @routes
    end

    def show
        @route = Route.find(params[:id])

        render json: @route
    end

    def new
        @route = Route.new
    end

    def create
        @route = Route.create!(route_params)

        render json: @route
    end


    private

    def route_params
        params.require(:route).permit!
    end

end
