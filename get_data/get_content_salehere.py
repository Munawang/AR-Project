import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os
                
page = requests.get("https://www.salehere.co.th/article/interest/whip-cream/")
parse_content = BeautifulSoup(page.content,'html.parser')
title_article = parse_content.find('h1')
content_article = parse_content.find('div', id='js_a3')

#Save all data to JSON file
with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"Article_salehere_"+'.json', 'w', encoding="utf-8") as info:
        info.write(str(title_article))
        info.write(str(content_article))
