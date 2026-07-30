# ESAP final project micro-report

## What the app does:

We created an online game that is a satire of Captcha verification tests that you commonly encounter on apps or websites (my parents often make me complete them for them, as they have become absurdly more difficult in recent years). The goal is to complete all the captchas in the shortest time possible, so you can be ranked the highest in the leaderboard and prove how non-robot you are. The captchas appear in a randomly generated order that restarts each time, and if you fail one, you get sent back to the beginning (and your time restarts). 

## How to install dependencies and run locally:

To run this app, first enter the folder where it is located:
```
cd final_project
```
Make sure you have Python and Flask installed on your device (preferrably the latest version, see requirements.txt for more details). 

Then, create a virtual environment, and activate it in command prompt:
```
python -m venv venv
```
On Windows:
```
venv\Scripts\activate
```
On Mac/Linux:
```
source venv/bin/activate
```

When in your virtual environment, install Flask and Pandas:
```
pip install flask pandas
```

To run the app, use:
```
python app.py
```

The app should open in your browser tab. If not, go to http://127.0.0.1:5000/ (local host)


## Known limitations:

The bots in the captchas (namely tic-tac-toe and connect 4) do not have a proper AI. While they make moves, neither has a proper algorithim to make these moves. The tic-tac-toe bot chooses the first move possible (going from left to right, then top to bottom) and the connect 4 bot simply moves at random. 