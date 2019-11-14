import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os
                
page = requests.get("https://food.mthai.com/food-recommend/118961.html")
parse_content = BeautifulSoup(page.content,'html.parser')
title_article = parse_content.find('h1')
title_text = title_article.text
publish_article = parse_content.find('div', class_='entry-meta')
content_article = parse_content.find('div', id='content-inner-118961')

#Save all data to JSON file
with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"Article_mthai_"+title_text+'.json', 'w', encoding="utf-8") as info:
        info.write(str(title_article))
        info.write(str(publish_article))
        info.write(str(content_article))
