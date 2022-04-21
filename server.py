from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from user import *

class User(Resource):
    def get(self, user_name):
        fetcher = Fetcher()
        user = fetcher.fetch(user_name)
        json = user.toJSON(1)
        return json, 200
class Repositories(Resource):
    def get(self, user_name):
        fetcher = Fetcher()
        user = fetcher.fetch(user_name)
        json = user.toJSON(0)
        return json, 200


app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api.add_resource(User, '/user/<user_name>')
api.add_resource(Repositories, '/repositories/<user_name>')
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
if __name__ == '__main__':
    app.run(debug=True)