# Quiz-Bot-with-Admin-Panel

# Quizz Bot

This is the application for creating contests and quizzes. You can create several quizzes in one bot and choose the winner of each quiz!.

# Run and set up

## Rinning backend and cretating tables
First of all go to the **./backend** folder and run `pip install -r requirements.txt`
than go to the **main.py** and run it `python3 ./main.py`. This steps neeeded to create your database.
Than comment line `cli()` and uncomment `app.run(debug=True)`.
To run the application type into console  `python3 ./main.py`

## Rinning bot
To running bot go to **./bot** folder and you should create a .env file with token of your bot.
You can get the token through https://t.me/BotFather.  

Just follow to steps:  
1. Write him command `/start` and than `/newbot` 
2. Write the name of your bot. 
3. Create a username for your bot.

Further create **.env** file and add into `API_TOKEN = {your_token}`
than go to **main.py** and run it `python3 ./main.py`
Note: you should create a database **before** running bot

## Rinning frontend
To start up frontend of admin panel go to **./frontend folder**
and type in console `npm i` and `npm start`
