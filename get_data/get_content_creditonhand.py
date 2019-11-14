import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os
                
page = requests.get("https://www.creditonhand.com/Thai-Food-Restaurant/198/54.php")
parse_content = BeautifulSoup(page.content,'html.parser')
title_article = parse_content.find('h1')
title_text = title_article.text
topic_article = parse_content.find('div', class_='traveltexttopic')
content_article = parse_content.find('h3')

#Save all data to JSON file
with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"Article_creditonhand_"+title_text+'.json', 'w', encoding="utf-8") as info:
        info.write(str(title_article))
        info.write(str(topic_article))
        info.write(str(content_article))
