import json
import os
#------- Get nameRes FBT Zone ---------
#getfbt = open('C://Users//Munawang//Desktop//dataplace//FBT_nameplace.txt' ,encoding="utf-8")
#------- Get nameRes Jinda Zone ---------
#getname = open('C://Users//Munawang//Desktop//dataplace//Jinda_nameplace.txt' ,encoding="utf-8")
#------- Get nameRes Keki Zone ---------
#getname = open('C://Users//Munawang//Desktop//dataplace//Keki_nameplace.txt' ,encoding="utf-8")

#while True:
#    data = getfbt.readline()
#    print(data)
#    if not data:
#        break

with open('C://Users//Munawang//Desktop//dataplace//Keki_มุมสบาย_th.json', 'r', encoding="utf-8") as f:
        data = json.load(f)

#--------- zone list ---------
#เก็บรายชือร้านหรือชื่อไฟล์ในแต่ละzone
#zone = {'zone01':'Keki', 'zone02':'Jinda', 'zone03':'FBT'}
#res_Keki = []
#res_Jinda = []
#res_FBT = [] 
#-----datatype ==> <class 'dict'>------
#print("typedata = ", type(data))
#-----Print all json data ----------
#print(data['result'])
for res in data.values():
#----- check type ----
    if isinstance(res, dict) == True:
        res_name = res['name']
        #rest_id
        res_type = res['types'][0]
        #res_urlimage = res['photos']
        #res_zone
        res_location = (res['geometry'])['location']
        res_viewport = (res['geometry'])['viewport']
        res_northeast = res_viewport['northeast']
        res_southwest = res_viewport['southwest']
        res_northeast_lat = res_northeast['lat']
        res_northeast_lng = res_northeast['lng']
        res_southwest_lat = res_southwest['lat']
        res_southwest_lng = res_southwest['lng']
        res_lat = res_location['lat']
        res_lng = res_location['lng']
        res_review = res['reviews']
        res_ratingscore = res['rating']
        res_opening = res['opening_hours']['weekday_text']
        #res_openingstatus
        #res_urlother
        res_phonenumber = res['formatted_phone_number']

        #-------- create dic to file json ---------
        info = {
            'res_name' : res_name,
            'res_type' : res_type,
            'res_phonenumber' : res_phonenumber,
            'res_review1' : res_review[0]['text'],
            'res_review2' : res_review[1]['text'],
            'res_review3' : res_review[2]['text'],
            'res_review4' : res_review[3]['text'],
            'res_review5' : res_review[4]['text'],
            'res_ratingscore' : res_ratingscore,
            'res_opening' : res_opening,
            'res_lat' : res_lat,
            'res_lng' : res_lng,
            'res_northeast_lat' : res_northeast_lat,
            'res_northeast_lng' : res_northeast_lng,
            'res_southwest_lat' : res_southwest_lat,
            'res_southwest_lng' : res_southwest_lng
        }
        
        #with open('Desktop/testres.json', 'w', "utf-8") as json_file:
        with open('C://Users//Munawang//Desktop//zone//keki//' + res_name + '.json', 'w', encoding="utf-8") as json_file:
            json.dump(info, json_file, indent=4, ensure_ascii=False)

        #print(type(res_northeast_lat))
        #print(res_northeast_lat)
f.close()