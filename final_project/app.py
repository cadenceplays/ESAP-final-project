import sqlite3
from flask import Flask, render_template, request,  jsonify
from flask_cors import CORS # anti-cheat
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATABASE = 'database.db'

start_time = 0 #the time in which the user started game

def get_db_connect():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connect()
    with open('schema.sql', 'r') as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/game')
def start():
    return render_template('start.html')

@app.route('/leaderboard')
def leaderboard_page():
    return render_template('leaderboard.html')

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    conn = get_db_connect()
    scores = conn.execute(
        'SELECT username, completion_time, created_at FROM leaderboard ORDER BY completion_time ASC LIMIT 10'
    ).fetchall()
    conn.close()

    leaderboard_data = [dict(row) for row in scores]
    return jsonify(leaderboard_data), 200

@app.route('/api/submit-score', methods=['POST'])
def submit_score():
    data = request.get_json()

    if not data or 'username' not in data or 'time' not in data:
        return jsonify({'error': 'invalid payload. "username" and "time" required.'}), 400

    username = data['username'].strip() or "anon"
    try:
        completion_time = float(data['time'])
    except ValueError:
        return jsonify({'error': 'invalid time'}), 400

    conn = get_db_connect()
    conn.execute(
        'INSERT INTO leaderboard (username, completion_time) VALUES (?, ?)', (username, completion_time)
    )
    conn.commit()
    conn.close()

    return jsonify({'message': 'score saved successfully!'}), 201

if __name__ == '__main__':
    import os
    if not os.path.exists(DATABASE):
        init_db()
    app.run(debug=True)