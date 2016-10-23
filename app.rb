require 'sinatra'
require 'json'
set :views, "./views"

get '/' do
   file = File.read('data.json')
   if File.size('data.json') >= 2
     @favorites = JSON.parse(file)
   else
     @favorites = []
   end
   erb :index
end

get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  file = File.read('data.json')
  data_hash = JSON.parse(file)
  data_hash if data_hash
end

post '/favorites' do
  tempHash = JSON.parse(request.body.read)
  json = File.read('data.json')

  if json and json.length >= 2
    secondJsonArray = JSON.parse(json)
  else
    secondJsonArray = []
  end
  secondJsonArray << tempHash

  File.open("data.json","w") do |f|
    f.puts JSON.pretty_generate(secondJsonArray)
  end
end

delete '/favorites' do
  f = open('data.json', File::TRUNC) {}
end
