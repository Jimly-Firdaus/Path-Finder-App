from flask import Flask, request
from src.main import main
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/solve', methods=['POST'])
def solve():
    print(request.data.decode('utf-8'))
    text = request.data.decode('utf-8')
    print(text)
    # main(text)
    return "Hello World"

if __name__ == '__main__':
    app.run()