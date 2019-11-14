import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os

url_list = open('foursquare_list.txt', 'r', encoding="utf-8")
count = 0

for j in url_list:
        count += 1
print(count)

url_list.seek(0,0)
for i in range(count):
        response = url_list.readline()
        suffix_url = response.replace(" ","").strip("\n")
        url = "https://foursquare.com/v/"+str(suffix_url)
        url_img = url+"/photos"
        print(url)
        
        try:
                #get data from website
                page = requests.get(url)
                parse_content = BeautifulSoup(page.content,'html.parser')
                name_restaurant = parse_content.find('h1')
                name_text = name_restaurant.text.strip("\n")
                info_restaurant = parse_content.find('div', class_='primaryInfo')
                address_restaurant = parse_content.find('div', class_='venueRowContent')
                reviews = parse_content.find_all('li' , class_='tip')
                data = str(name_restaurant)+'\n'+str(info_restaurant)+'\n'+str(address_restaurant)

                #get images from website
                page_img = requests.get(url_img)
                parse_img = BeautifulSoup(page_img.content,'html.parser')
                user_img = parse_img.find_all('img', class_='mainPhoto')
                
                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"FourSquare_"+name_text+'.json', 'w', encoding="utf-8") as info:
                        info.write(str(data))
                        for comment in reviews:
                        	info.write(str(comment)+'\n')
                        for image in user_img:
                        	info.write(str(image)+'\n')


        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()
