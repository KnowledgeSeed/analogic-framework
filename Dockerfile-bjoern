ARG PYTHON_VERSION=3.12
FROM python:${PYTHON_VERSION}-slim-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends libodbc2 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /analogic
COPY requirements-server.lock /analogic/
RUN python -m pip install --no-cache-dir --require-hashes -r requirements-server.lock
COPY . /analogic
RUN python -m pip install --no-cache-dir --no-deps .

EXPOSE 5000
ENV ANALOGIC_WSGI_SERVER=waitress
CMD ["python", "/analogic/run.py"]
