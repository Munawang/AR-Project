import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os

url_list = open('only_wongnai_list.txt', 'r', encoding="utf-8")
count = 0

for j in url_list:
        count += 1
print(count)

url_list.seek(0,0)
for i in range(count):
        response = url_list.readline()
        suffix_url = response.replace(" ","").strip("\n")
        url = "https://www.wongnai.com/restaurants/"+str(suffix_url)
        print(url)
        
        try:
                #get data from website
                page = requests.get(url)
                parse_content = BeautifulSoup(page.content,'html.parser')
                name_restaurant = parse_content.find('h1')
                name_text = name_restaurant.text
                restaurant_category = parse_content.find('div', class_='sc-1ascgl-2 ajbgx')
                info_restaurant = parse_content.find_all('div', class_='_1weidWQshSdU3oH6Fm7DNW')
                address_restaurant = parse_content.find('div', class_='tqcnkz-7 bRctA')
                phone_restaurant = parse_content.find('div', class_='sc-3wjlti-1 kjrRlE')
                data = str(name_restaurant)+'\n'+str(restaurant_category)+'\n'+str(address_restaurant)+'\n'+str(phone_restaurant)

                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"OnlyWongnai_"+name_text+'.json', 'w', encoding="utf-8") as info:
                        info.write(str(data))
                        for information in info_restaurant:
                                info.write(str(information)+'\n')


        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()
