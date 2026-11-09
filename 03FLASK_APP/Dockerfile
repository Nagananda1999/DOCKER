FROM python:3.12.16-alpine3.23

RUN pip install --no-cache-dir flask==3.1.3

COPY app.py /opt/app.py

ENV FLASK_APP=/opt/app.py

EXPOSE 80

ENTRYPOINT ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=80"]
