```bash
docker build -t simple_webapp .

docker run -d --name simple_webapp -p 9090:80 simple_webapp
```
