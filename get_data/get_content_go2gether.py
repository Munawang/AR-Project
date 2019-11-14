import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os
                
page = requests.get("https://www.go2gether.in.th/eating/shogun-%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B1%E0%B8%87/")
parse_content = BeautifulSoup(page.content,'html.parser')
title_article = parse_content.find('h1')
title_text = title_article.text
content_article = parse_content.find('article', id='post-907')

#Save all data to JSON file
with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"Article_go2gether_"+title_text+'.json', 'w', encoding="utf-8") as info:
        info.write(str(title_article))
        info.write(str(content_article))
