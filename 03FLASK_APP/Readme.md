```bash
docker build -t flask-app .

docker run -d --name flask_app -p 8080:80 flask-app
```

Open http://localhost:8080 — the page returns `Hello World`.