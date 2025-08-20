import os
from flask import Flask, jsonify, send_from_directory
import pandas as pd

# Define a pasta estática corretamente
app = Flask(__name__, static_folder='social-health-impact')

# 🔹 Rotas de frontend (arquivos estáticos)
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/script.js')
def script():
    return send_from_directory(app.static_folder, 'script.js')

@app.route('/style.css')
def style():
    return send_from_directory(app.static_folder, 'style.css')

# 🔹 Rotas de API (dados dinâmicos)
@app.route('/api/estados')
def estados():
    df = pd.read_csv('social-health-impact/data/processed/estados.csv')
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/investimentos')
def investimentos():
    df = pd.read_csv('social-health-impact/data/processed/investimentos_saude.csv')
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/indicadores')
def indicadores():
    df = pd.read_csv('social-health-impact/data/processed/indicadores_saude.csv')
    return jsonify(df.to_dict(orient='records'))

# 🔹 Execução do servidor (ajuste para Render)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)

# Ajuste para Railway
# Railway usa a porta 8080 por padrão, então vamos garantir que o app use essa
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))  # Porta 8080 é a que Railway está usando
    app.run(debug=False, host='0.0.0.0', port=port)
