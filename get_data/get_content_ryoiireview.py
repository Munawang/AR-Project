import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os

url_list = open('ryoiireview_list.txt', 'r', encoding="utf-8")
count = 0

for j in url_list:
        count += 1
print(count)

url_list.seek(0,0)
for i in range(count):
        response = url_list.readline()
        url = response.replace(" ","").strip("\n")
        print(url)
        
        try:
                #get data from website
                page = requests.get(url)
                parse_content = BeautifulSoup(page.content,'html.parser')
                title_article = parse_content.find('h1')
                title_text = title_article.text.strip("\n")
                content_article = parse_content.find('div', id='main-content')
                
                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"Article_ryoiireview_"+title_text+'.json', 'w', encoding="utf-8") as info:
                        info.write(str(title_article))
                        info.write(str(content_article))


        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()

