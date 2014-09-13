class Brewery

  def initialize
    @client = BreweryDB::Client.new do |config|
      config.api_key = ENV['BREWERYDB_API_KEY']
      config.logger = Rails.logger
    end
  end

  def search(options = {})
    defaults = {
      withBreweries: 'Y',
      type: 'beer'
    }.merge(options)

    client.search.all(defaults.merge(options)).first(BreweryDB::PaginatedCollection::BATCH_SIZE)
  end

  private

  attr_reader :client
end
