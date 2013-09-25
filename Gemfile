source 'https://rubygems.org'

gem 'redis'
# PostgreSQL driver
gem 'pg'

# Sinatra driver
gem 'sinatra'
gem 'sinatra-contrib'

# Use Thin for our web server
gem 'thin'

gem 'activesupport'
gem 'activerecord'

gem 'rake'

gem 'shotgun'

group :test do
  gem 'faker'
  gem 'rspec'
end

# To have launchd start redis at login:
#     ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
# Then to load redis now:
#     launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
# Or, if you don't want/need launchctl, you can just run:
#     redis-server /usr/local/etc/redis.conf