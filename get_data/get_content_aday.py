import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os
                
page = requests.get("https://adaymagazine.com/university-food-stores/")
parse_content = BeautifulSoup(page.content,'html.parser')
title_article = parse_content.find('h1', class_='single-content__title')
title_text = title_article.text.strip('\n')
content_article = parse_content.find('div', class_='single-content__inner')

#Save all data to JSON file
with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"Article_aday_"+title_text+'.json', 'w', encoding="utf-8") as info:
        info.write(str(content_article))
