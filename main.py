from flask import Flask, render_template, request
import os
from replit import db
import json
# print(os.environ['REPLIT_DB_URL'])
app = Flask('app')

def cruserdict(password):
  return {
    'password':password
  }

users = json.loads(db.get_raw('users'))
@app.route('/')
def hello_world():
  return 'Hello, World!'

@app.route('/login')
def login():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    if username in users:
      if users[username] == password:
        return render_template('login.html', username=username)
      else:
        return 'Invalid password'
    else:
      return 'Invalid username'
  return render_template('login.html')

@app.route('/signup')
def signup():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    if username in db:
      return 'Username already exists'
    else:
      db['users'][username] = cruserdict(password)
      return 'Account created'
  return render_template('signup.html')
  
app.run(host='0.0.0.0', port=8080)