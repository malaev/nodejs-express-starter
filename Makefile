all: .
	nodemon ./server.js

test: .
	MONGODB_DB=db \
	MONGODB_HOST=mongodb://localhost:27017 \
	NODE_ENV=test \
	npm test
