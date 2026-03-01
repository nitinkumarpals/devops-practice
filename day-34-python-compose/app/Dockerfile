FROM python:3.11 AS builder

WORKDIR /app

COPY requirements.txt .

RUN pip install --user  -r requirements.txt

#second stage 

FROM gcr.io/distroless/python3-debian12

WORKDIR /app

COPY --from=builder  /root/.local /root/.local

COPY . .

ENV PATH=/root/.local/bin:$PATH

EXPOSE 5000

CMD ["app.py"]
