from flask import Flask, render_template, request, redirect
import os
from replit import db
import json
# print(os.environ['REPLIT_DB_URL'])
app = Flask('app')

def cruserdict(password):
  return {
    'days w/o smoking':0,
    'password':password,
    'goal':10,
    'points':0,
    'items':[]
  }
users = json.loads(db.get_raw('users'))
print(users)
def save():
  global users
  users = json.loads(db.get_raw('users'))
  
@app.route('/')
def hello_world():
  return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    if username in users:
      if users[username]['password'] == password:
        return redirect('/user/'+ username)
      else:
        return 'Invalid password'
    else:
      return 'Invalid username'
  return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    if username in db:
      return 'Username already exists'
    else:
      db['users'][username] = cruserdict(password)
      save()
      return redirect('/user/' + username)
  return render_template('signup.html')

@app.route('/user/<uname>', methods=['GET'])
def userpage(uname):
  datatopass = users[uname].copy().copy()
  del datatopass['password']
  return render_template('user.html', data=datatopass, uname=uname)

@app.route('/play', methods=['GET'])
def playpage():
  return render_template('play.html')

@app.route('/shop', methods=['GET'])
def shoppage():
  return render_template('shop.html')

@app.route('/save', methods=['POST'])
def savepage():
  data = request.json
  uname = data['uname']
  data['password'] = db['users'][uname]['password']
  del data['uname']
  db['users'][uname] = data
  save()
  print(db['users'][uname])
  return 'saved'
  
app.run(host='0.0.0.0', port=8080)