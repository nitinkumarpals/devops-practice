FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache -r requirements.txt 

COPY . .

RUN useradd -m appuser
USER appuser

EXPOSE 5000

CMD ["gunicorn","--workers","3","--bind","0.0.0.0:5000","app:app"]
