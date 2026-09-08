FROM python:3.12-slim

WORKDIR /app

# Python settings
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY . .

EXPOSE 8000

# Start Django using Gunicorn
CMD ["gunicorn", "server.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
