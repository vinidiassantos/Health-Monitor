import pandas as pd
import os

def baixar_dados_ibge():
    url_natalidade = 'https://raw.githubusercontent.com/example/dados_ibge_natalidade.csv'
    df_natalidade = pd.read_csv(url_natalidade, sep=',')
    df_natalidade.to_csv('data/raw/natalidade.csv', index=False)
    print("Arquivo natalidade.csv salvo em data/raw")

if __name__ == "__main__":
    baixar_dados_ibge()
