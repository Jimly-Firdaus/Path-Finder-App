from flask import Flask, request, jsonify
from src.main import main
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Backend Server for Tucil3_13521102_13521140'

@app.route('/solve', methods=['POST'])
def solve():
    data = request.json
    text = data['text']
    src = data['src'].strip()
    dest = data['dest'].strip()
    solver = data['solver'].strip()
    print(f"src: ----{src}----")
    print(f"dest: ----{dest}----")
    cost, route = main(text, str(src), str(dest), str(solver))
    result = (cost, route)
    return jsonify(result)

if __name__ == '__main__':
    app.run()
