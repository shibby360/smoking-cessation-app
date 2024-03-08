import requests, json, os
class db_:
  def __init__(self):
    return
  def __getitem__(self, key):
    return requests.get(os.environ['KV_REST_API_URL'] + '/get/' + key, headers={'Authorization':os.environ['KV_REST_API_TOKEN']}).json()['result']
  def __setitem__(self, key, value):
    print(requests.post(os.environ['KV_REST_API_URL'] + '/set/' + key, data=json.dumps(value), headers={'Authorization':os.environ['KV_REST_API_TOKEN']}).json())
db = db_()