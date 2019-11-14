import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os

url_list = open('eatguide_list.txt', 'r', encoding="utf-8")
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
                name_restaurant = parse_content.find('h1', class_='heading')
                name_text = name_restaurant.text.replace(" ","").strip("\n")
                publish_article = parse_content.find('div', class_='bar-date')
                content_article = parse_content.find('div', class_='info')
                img_article = parse_content.find('ul',id='show-photo')
                reviews = parse_content.find_all('article', class_="reviewitem")
                
                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"EatGuide_"+name_text+'.json', 'w', encoding="utf-8") as info:
                        info.write(str(name_restaurant))
                        info.write(str(publish_article))
                        info.write(str(content_article))
                        info.write(str(img_article))
                        for comment in reviews:
                                info.write(str(comment)+'\n')


        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()

