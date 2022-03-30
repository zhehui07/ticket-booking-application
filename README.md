# Application Description:
This application helps customers to book movie tickts. Movie information are retrieved from server. This application focus on client side. and I assume there are another system which maintains the movie info database. 
# The Application Functions:
1. Users can access movie information including date, name , and available seats when they get to the home page.
1. Users can check seats information by selecting date and name of a movie.
1. I created three movies in backend for demo purpose. 30th December 2021 has movie information, which including two movies "Snow White" and "Snow Black". 26th December has one movie.
1. Users can explore movies and available seats whether or not login. But, Users must login to book tickets.
1. Users can not log in if the user name is empty or invalid. 
1. The app will check sessionId when accessing to log in page.
1. Available seats are denoted by "+", and not availble seats are denoted by "X".
1. Not available seats cannot be selected.
1. If an user click an available seat, it will change to "O", and if the user click it again, it will change back to "+".
1. if an user booked a seat, the seat will change to "X" from "+".
1. The app will show the number of tickets the user been booked.
1. The app will calculate the number of tickets the user has book so far, and logging out won't affact the data.
1. Users can reselect seats before clicking the booking button.
1. Users can book mutiple seats at a time.
1. Seats for a certain movie cannot be booked twice, so if the seat has been booked, other users cannot book it again.
1. Users can log out when they are done.