import json
import requests
import csv
f = open('Keki_Kinnii_th.json', encoding="utf8")
data = json.load(f)
f.close()

for info in data['result']:
    print(info)
