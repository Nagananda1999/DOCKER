FROM ubuntu:24.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3-flask \
    && rm -rf /var/lib/apt/lists/*

COPY app.py /opt/app.py

ENV FLASK_APP=/opt/app.py

EXPOSE 80

ENTRYPOINT ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=80"]
