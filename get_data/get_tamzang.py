import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os

url_list = open('tamzang_list.txt', 'r', encoding="utf-8")
count = 0

for j in url_list:
        count += 1
print(count)

url_list.seek(0,0)
for i in range(count):
        response = url_list.readline()
        suffix_url = response.replace(" ","").strip("\n")
        url = "https://www.tamzang.com/places/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2/"+str(suffix_url)
        url_img = url+"?biz_photos"
        print(url)
        
        try:
                #get data from website
                page = requests.get(url)
                parse_content = BeautifulSoup(page.content,'html.parser')
                name_restaurant = parse_content.find('h1')
                name_text = name_restaurant.text.strip("\r\n").replace(" ","")
                info_restaurant = parse_content.find_all('div', class_='geodir_more_info')

                #get images from website
                page_img = requests.get(url_img)
                parse_img = BeautifulSoup(page_img.content,'html.parser')
                user_img = parse_img.find_all('div', class_='whoop-biz-photo-box')
                
                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Web_Scraping//'+"Tamzang_"+name_text+'.json', 'w', encoding="utf-8") as info:
                        info.write(str(name_restaurant))
                        for information in info_restaurant:
                                info.write(str(information)+'\n')
                        for image in user_img:
                                info.write(str(image)+'\n')


        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()

