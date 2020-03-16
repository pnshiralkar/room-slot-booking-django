FROM python:3.7-slim

RUN pip install django
RUN pip install djangorestframework
RUN pip install django-cors-headers
RUN pip install requests

COPY src /var/opt/room-slot-booking/

ENTRYPOINT cd /var/opt/room-slot-booking/ ; python3 manage.py test ; python3 manage.py runserver 0.0.0.0:8000