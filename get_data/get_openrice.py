import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os
import time

url_list = open('openrice_list.txt', 'r', encoding="utf-8")
count = 0

for j in url_list:
        count += 1
print(count)

url_list.seek(0,0)
for i in range(count):
        response = url_list.readline()
        suffix_url = response.replace(" ","").strip("\n")
        url = "https://th.openrice.com/th/bangkok/r-"+str(suffix_url)
        url_img = url+"/photos"
        url_reviews = url+"/reviews"
        print(url)
        
        try:
                time.sleep(0.01)
                #get data from website
                page = requests.get(url)
                parse_content = BeautifulSoup(page.content,'html.parser')
                name_restaurant = parse_content.find('h1')
                name_text = name_restaurant.text.strip("\n")
                info_restaurant = parse_content.find('div', class_='poi-header-info-container')
                contact_restaurant = parse_content.find('div', class_='left-col-content-section')
                recomend_dishes = parse_content.find('section', class_='signature-dishes-section')
                
                data = str(name_restaurant)+'\n'+str(info_restaurant)+'\n'+str(contact_restaurant)+'\n'+str(recomend_dishes)

                #get images from website
                page_img = requests.get(url_img)
                parse_img = BeautifulSoup(page_img.content,'html.parser')
                user_img = parse_img.find('div', id='sr2-photo-container')

                #get reviews from website
                page_reviews = requests.get(url_reviews)
                parse_reviews = BeautifulSoup(page_reviews.content,'html.parser')
                reviews = parse_reviews.find('div' , id='sr2-review-container')
                
                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"OpenRice_"+name_text+'.json', 'w', encoding="utf-8") as info:
                        info.write(str(data))
                        info.write(str(reviews))
                        info.write(str(user_img))

        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()

