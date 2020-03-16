# Room Slot Booking Project
<br>

## FOSSEE details :

#### Email : pnshiralkar@gmail.com
#### Username(courses.fossee.in) : pnshiralkar
#### Username(yaksh.fossee.in) : pnshieralkar

<br/>

## About the project :
**This is a simple room slot booking app built using Django, Django-REST-Framework and React.js.**\
**This Project is also available as API**\
<img src="https://github.com/pnshiralkar/room-slot-booking-django/blob/master/Screenshots/1.HomePage.png" width="49%">
<img src="https://github.com/pnshiralkar/room-slot-booking-django/blob/master/Screenshots/2.APIDoc.png" width="49%">\
**Other screenshots available [here](https://github.com/pnshiralkar/room-slot-booking-django/tree/master/Screenshots)**

<br/>

## Start Server Locally :
* ### Docker Image - 
   **Make sure you have docker installed. If not, refer: https://docs.docker.com/install/** \
   `sudo docker run -it -p 8000:8000 pnshiralkar/fossee`
* ### Download code and run - 
    **1. [Download](https://github.com/pnshiralkar/room-slot-booking-django/archive/master.zip) and extract the zip of Project and cd inside**\
    **OR**\
    `git clone https://github.com/pnshiralkar/room-slot-booking-django.git`\
    `cd room-slot-booking-django`\
    **2.** `sudo pip3 install virtualenv`  **OR**  `sudo pip install virtualenv`\
    **3.** `virtualenv venv`\
    **4.** `source venv/bin/activate`\
    **5.** `cd src`\
    **6.** `pip install -r requirements.txt`\
    **7. Run Tests -** `python manage.py test`\
    **8. Run Server -** `python manage.py runserver`


## Highlights of the Project :
* PEP-8 Coding guidelines followed
* Docker used to containerize the project
* Used Django Server for backend
* Added several tests for the Django project
* Used React.js for frontend
* API Endpoints created for user login/signup, manage rooms, timeslots, bookings
* Used Swagger for API Documentation 


## Details of the project :
 * Project can be used by the room managers to create, update or remove rooms and corresponding time slots.
 * A Room manager can view the bookings of his rooms on the dashboard
 * A customer can book rooms or cancel the bookings.
 * A customer can see summary of bookings on the dashboard
 * The sample database already has following users created : \
  **1. Superuser** - username: admin, password: admin \
  **2. Customer** - username: test_customer, password: cust1234 \
  **3. RoomManager** - username: test_room_manager, password: rmgr1234 

