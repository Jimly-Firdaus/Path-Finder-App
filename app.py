from flask import Flask
from src.main import main

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/solve', methods=['POST'])
def solve():
    text = request.data.decode('utf-8')
    main(text)

if __name__ == '__main__':
    app.run()