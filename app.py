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
    data = request.json
    text = data['text']
    src = data['src']
    dest = data['dest']
    return main(text, src, dest)

if __name__ == '__main__':
    app.run()