docker build -t personalblog-engine .
docker run -p 5000:5000 --env-file .env personalblog-engine
