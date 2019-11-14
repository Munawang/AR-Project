
import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os
                
page = requests.get("https://foursquare.com/v/%E0%B8%AB%E0%B8%A1%E0%B8%97%E0%B8%AD%E0%B8%94%E0%B8%9B%E0%B8%B2%E0%B8%88%E0%B8%81/5ce6bb9df5e9d7002cd23b6b/photos")
parse_content = BeautifulSoup(page.content,'html.parser')
get_img = parse_content.find_all('img',class_='mainPhoto')

#Save all data to JSON file
with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"test_get_img"+'.json', 'w', encoding="utf-8") as info:
        for image in get_img: 
        	info.write(str(image)+'\n')
