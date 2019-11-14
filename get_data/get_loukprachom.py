import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os

url_list = open('loukprachom_list.txt', 'r', encoding="utf-8")
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
                page = requests.get(url)
                parse_content = BeautifulSoup(page.content,'html.parser')
                name_website = parse_content.find('h1')
                name_website_text = name_website.text.strip("\n")
                name_restaurant = parse_content.find('div', class_='post_title')
                name_restaurant_text = name_restaurant.text.strip("\n")
                date_publish = parse_content.find('div', class_='post_date')
                content = parse_content.find('div' , class_='entry')
                data = str(name_restaurant)+'\n'+str(date_publish)+'\n'+str(content)
                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+name_website_text+'_'+name_restaurant_text+'.json', 'w', encoding="utf-8") as info:
                        info.write(str(data))

        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()