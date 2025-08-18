import pandas as pd

def limpar_nomes_colunas(df):
    df.columns = [col.strip().lower().replace(' ', '_') for col in df.columns]
    return df
