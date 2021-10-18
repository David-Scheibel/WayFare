class ApplicationController < ActionController::API
    before_action :logged_in?
    # skip_before_action :logged_in? only: [:current_user]

    def encode_token(data)
        JWT.encode(data, "Bulgogi Sliders", "HS256")
    end

    def logged_in?
        headers = request.headers["Authorization"]
        token = headers.split(" ")[1]

        begin
            rider_id = JWT.decode(token, "Flatiron", "HS256")[0]["rider_id"]
            @rider = Rider.find(rider_id)
        rescue
            # user is not found because token was not provided
            @rider = nil
        end

        unless @rider
            render json: {error: "Please login"}
        end
    end

    def current_user
        @rider
    end
    
end
