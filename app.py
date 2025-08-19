from flask import Flask, jsonify, send_from_directory
import pandas as pd
import os

app = Flask(__name__, static_folder='social-health-impact')

# Rota principal do site
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Rota para arquivos estáticos
@app.route('/script.js')
def script():
    return send_from_directory(app.static_folder, 'script.js')

@app.route('/style.css')
def style():
    return send_from_directory(app.static_folder, 'style.css')

# Rota da API com dados dos estados
@app.route('/api/estados')
def estados():
    df = pd.read_csv('social-health-impact/data/processed/estados.csv')
    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
