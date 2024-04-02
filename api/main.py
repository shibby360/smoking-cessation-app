import os
import time
from flask import Flask, render_template, request, redirect
if __name__ == '__main__':
  import sys
  sys.path.append('/home/runner/smoking-cessation-website/')
import dbclass
os.environ['TZ'] = 'US/Pacific'
time.tzset()
app = Flask('app')
db = dbclass.db
def cruserdict(password):
  return {
    'days w/o smoking':0,
    'password':password,
    'goal':10,
    'points':0,
    'items':["starter-body", "starter-head", "starter-lhand", "starter-rhand", "starter-rleg", "starter-lleg"],
    'last logged in':time.time(),
    'total days':0,
    'avatar':{
      'hat':'', 
      'head':'starter-head', 
      'body':'starter-body', 
      'rleg':'starter-rleg',
      'lleg':'starter-lleg',
      'rhand':'starter-rhand',
      'lhand':'starter-lhand', 
      'accesory':['', 'right'],
      'badge':''
    }
  }
users = db['users']
# print(users)
for i in users:
  print(i)
  print(users[i])
def save():
  global users
  db['users'] = users
  
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
        return redirect('/user/' + username + '?f=1')
      else:
        return redirect('/login?i=1')
    else:
      return redirect('/login?i=1')
  return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    if username in users:
      return 'Username already exists'
    else:
      users[username] = cruserdict(password)
      save()
      return redirect('/user/' + username + '?f=1')
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

@app.route('/inventory', methods=['GET'])
def inventorypage():
  return render_template('inventory.html')
  
@app.route('/save', methods=['POST'])
def savepage():
  data = request.json
  uname = data['uname']
  data['password'] = users[uname]['password']
  del data['uname']
  users[uname] = data
  save()
  print(users[uname])
  return 'saved'

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)