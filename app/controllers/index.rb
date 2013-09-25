require 'redis'
require 'json'

redis = Redis.new

get '/' do
  # Look in app/views/index.erb 
  erb :index
end

post '/prep_table' do
  rand = (0...8).map{(65+rand(26)).chr}.join
  batch = "batch" + rand
  redis.set batch, params.to_json
  if request.xhr?
  	redis.get(batch)
  end
end

post '/oven' do
  
  erb :index
end