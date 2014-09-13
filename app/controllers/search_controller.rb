class SearchController < ApplicationController

  def index
    @results = Rails.cache.fetch(search_params) do
Rails.logger.debug "=============#{search_params}"
      Brewery.new.search(search_params)
    end

    render json: @results
  end

  private

  def search_params
    params.slice(:q)
  end
end
