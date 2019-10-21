import requests
import urllib
import json
import os

file_txt = open('jindazone.txt', 'r', encoding="utf-8")

t1 = 'https://maps.googleapis.com/maps/api/place/details/json?place_id='
t2 = ('&fields=address_component,adr_address,formatted_address,geometry,icon,name,permanently_closed,photo,place_id'+
',plus_code,type,url,utc_offset,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total&key=')
t3 = ('&language=th')
key = 'AIzaSyDvxzqr4qQKxIE7llXkPfkpiaMa8amsixo'
count = 0

for j in file_txt:
    count += 1
print(count)

file_txt.seek(0,0)
for i in range(count):
    s = file_txt.readline()
    place_id = s.lstrip().split(': ');
    url_en = t1+place_id[1].rstrip('\r\n')+t2+key
    url_th = url_en+t3
    data_en = urllib.request.urlopen(url_en)
    data_th = urllib.request.urlopen(url_th)
    dataRaw_en = data_en.read().decode()
    dataRaw_th = data_th.read().decode()
    with open('C://Users//Supapitch//Desktop//data_restaurant//'+place_id[0]+'_en'+'.json', 'w', encoding="utf-8") as info:
    	info.write(dataRaw_en)
    with open('C://Users//Supapitch//Desktop//data_restaurant//'+place_id[0]+'_th'+'.json', 'w', encoding="utf-8") as info:
    	info.write(dataRaw_th)


file_txt.close()
