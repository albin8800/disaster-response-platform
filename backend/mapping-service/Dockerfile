# ----------------------------------------------------                                                                                                               
# Stage 1: Builder (Compiles wheels & installs packages)                                                                                                             
# ----------------------------------------------------                                                                                                               
FROM python:3.12-slim AS builder                                                                                                                                     
                                                                                                                                                                     
WORKDIR /app                                                                                                                                                         
                                                                                                                                                                     
# Create an isolated virtual environment inside the container                                                                                                        
RUN python -m venv /opt/venv                                                                                                                                         
ENV PATH="/opt/venv/bin:$PATH"                                                                                                                                       
                                                                                                                                                                     
# Copy and install dependencies                                                                                                                                      
COPY requirements.txt .                                                                                                                                              
RUN pip install --no-cache-dir --upgrade pip && \                                                                                                                    
    pip install --no-cache-dir -r requirements.txt                                                                                                                   

# ----------------------------------------------------
# Stage 2: Lean Production Runtime
# ----------------------------------------------------
FROM python:3.12-slim AS runner

WORKDIR /app

# Python environment variables for container stability & instant logging
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH"

# Copy the pre-built virtual environment from Stage 1
COPY --from=builder /opt/venv /opt/venv

# Security best practice: Create and run as a non-root system user
RUN groupadd -r appgroup && useradd -r -g appgroup -s /sbin/nologin appuser

# Copy application source code
COPY --chown=appuser:appgroup app/ ./app

USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
