from flask import Flask, request, jsonify
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
    print(f"src: {src}")
    print(f"dest: {dest}")
    cost, route = main(text, src, dest)
    result = (cost, route)
    return jsonify(result)

if __name__ == '__main__':
    app.run()