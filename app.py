import sqlite3
from flask import Flask, render_template, request,  jsonify
from flask_cors import CORS # for external/api requests
from datetime import datetime

app = Flask(__name__)
CORS(app) # enable cors

# config database file
DATABASE = 'database.db'

start_time = 0 # the time in which the user started game


def get_db_connect():
    '''
    establish connection to sqlite database
    configure to return dictionary looking objects
    '''
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    '''
    init database structure by executing schema.sql
    create database.db if it doesnt exist yet 
    (if you delete this file, it deletes all leaderboard entries)
    '''
    conn = get_db_connect()
    with open('schema.sql', 'r') as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()

@app.route('/')
def home():
    '''
    Renders the home page
    '''
    return render_template('home.html')


@app.route('/game')
def start():
    '''
    Renders the game page,
    all game js files show up here
    '''
    return render_template('start.html')


@app.route('/leaderboard')
def leaderboard_page():
    '''
    Leaderboard page, displays all recorded times.
    Gives different color to top 3 places 
    '''
    return render_template('leaderboard.html')


@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    '''
    fetch top 10 highscores in database.db leaderboard
    return json array sorted by completion time in ascending order (fastest = #1)
    display on leaderboard
    '''
    conn = get_db_connect()
    scores = conn.execute(
        'SELECT username, completion_time, created_at FROM leaderboard ORDER BY completion_time ASC LIMIT 10'
    ).fetchall()
    conn.close()

    # convert sqlite row object into python dict for json
    leaderboard_data = [dict(row) for row in scores]
    return jsonify(leaderboard_data), 200


@app.route('/api/submit-score', methods=['POST'])
def submit_score():
    '''
    handle high score submissions sent with json post payload
    validate input before inserting into database
    '''
    data = request.get_json()

    # validate payload structure
    if not data or 'username' not in data or 'time' not in data:
        return jsonify({'error': 'invalid payload. "username" and "time" required.'}), 400

    # clean/default username if empty
    username = data['username'].strip() or "anon"

    # validate completion time
    try:
        completion_time = float(data['time'])
    except ValueError:
        return jsonify({'error': 'invalid time'}), 400

    # save validated score to database
    conn = get_db_connect()
    conn.execute(
        'INSERT INTO leaderboard (username, completion_time) VALUES (?, ?)', (username, completion_time)
    )
    conn.commit()
    conn.close()

    return jsonify({'message': 'score saved successfully!'}), 201

if __name__ == '__main__':
    import os
    # automatically init database tables if file is missing
    if not os.path.exists(DATABASE):
        init_db()

    # TODO: remove dev server
    app.run()