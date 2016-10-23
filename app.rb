require 'sinatra'
require 'json'
set :views, "./views"

get '/' do
   erb :index
end

#get 'favorites' do
#  response.header['Content-Type'] = 'application/json'
  #File.read('data.json')
#end

put '/favorites' do
  unless params['name']
    return 'Invalid Request'
  end
  name = params['name']
  open('data.json', 'a') do |f|
    f.puts name
  end
end
