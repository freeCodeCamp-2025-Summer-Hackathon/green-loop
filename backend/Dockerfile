FROM python:3.12.4-slim

# Set working directory to /backend inside container
WORKDIR /backend

# Copy requirements from host's backend/ to container's /backend
COPY ./backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy ALL backend files (including main.py)
COPY ./backend/ .

EXPOSE 8000

# Run from the correct module path
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
