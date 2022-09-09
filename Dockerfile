FROM python:3.9.13-buster

RUN apt-get update
RUN apt-get install -y python3-dev libev-dev
RUN pip install bjoern

WORKDIR /analogic
COPY . /analogic

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "/analogic/run.py"]
