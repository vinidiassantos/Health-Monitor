from flask import Flask, jsonify, send_from_directory
import pandas as pd
import os

app = Flask(__name__, static_folder='social-health-impact')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/script.js')
def script():
    return send_from_directory(app.static_folder, 'script.js')

@app.route('/style.css')
def style():
    return send_from_directory(app.static_folder, 'style.css')

@app.route('/api/dados')
def dados():
    df = pd.read_csv('social-health-impact/data/dados_integrados.csv')
    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
