import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os

url_list = open('business_site_list.txt', 'r', encoding="utf-8")
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
                name_restaurant = parse_content.find('h1')
                name_text = name_restaurant.text
                annouce = parse_content.find('span', class_='notification-content')
                opening_hours = parse_content.find('div', id='hours_content')
                info_restaurant = parse_content.find_all('div', class_='kCmrbf')
                update_part = parse_content.find_all('article', class_='LzG70e post')
                menus = parse_content.find_all('article',class_='I1jLM')
                reviews = parse_content.find_all('div' , class_='iTushb')
                images = parse_content.find_all('img')
                data = str(name_restaurant)+'\n'+str(annouce)+'\n'+str(opening_hours)                
                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"Business_site_"+name_text+'.json', 'w', encoding="utf-8") as info:
                        info.write(str(data))
                        for information in info_restaurant:
                                info.write(str(information)+'\n')
                        for update in update_part:
                                info.write(str(update)+'\n')
                        for menu in menus:
                                info.write(str(menu)+'\n')
                        for comment in reviews:
                                info.write(str(comment)+'\n')
                        for image in images:
                                info.write(str(image)+'\n')


        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()

