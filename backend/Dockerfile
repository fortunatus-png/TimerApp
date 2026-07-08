FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .
COPY migrate.py .
COPY sessions.db .

CMD ["fastapi", "dev", "--host", "0.0.0.0", "--port", "8000"]