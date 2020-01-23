import requests
from requests.exceptions import HTTPError
import bs4
from bs4 import BeautifulSoup
import json
import os

url_list = open('wongnai_list.txt', 'r', encoding="utf-8")
count = 0

for j in url_list:
        count += 1
print(count)

url_list.seek(0,0)
for i in range(count):
        response = url_list.readline()
        suffix_url = response.replace(" ","").strip("\n")
        url = "https://www.wongnai.com/restaurants/"+str(suffix_url)+"/reviews"
        print(url)
        
        try:
                #get data from website
                page = requests.get(url)  
                parse_content = BeautifulSoup(page.content,'html.parser')
                name_restaurant = parse_content.find('h1')
                name_text = name_restaurant.text.replace(" ","")
                user_info = parse_content.find_all('div', class_='osf0bs-0 emCdrD')
                rating = parse_content.find_all('div', class_='w0wgso-5 xVmtb')
                sum_cont = parse_content.find_all('div', class_='w0wgso-8 graXtG')
                review_cont = parse_content.find_all('p', class_='w0wgso-0 ksHgtz')
                img_user = parse_content.find_all('div', class_='w0wgso-12 eHjfAn')
                # reviews = parse_content.find_all('div', class_='w0wgso-3 hyZFro')

                #Save all data to JSON file
                with open('C://Users//Supapitch//Desktop//data_restaurant//Reviews_Scraping//'+"WongnaiReviews_"+name_text+'.json', 'w', encoding="utf-8") as info:
                        for user in user_info:
                                info.write(str(user)+'\n')
                        info.write("----------------------------------------------------------------"+'\n')
                        for rate in rating:
                                info.write(str(rate)+'\n')
                        info.write("----------------------------------------------------------------"+'\n')
                        for cont in sum_cont:
                                info.write(str(cont)+'\n')
                        info.write("----------------------------------------------------------------"+'\n')
                        for review in review_cont:
                                info.write(str(review)+'\n')
                        info.write("----------------------------------------------------------------"+'\n')
                        for img in img_user:
                                info.write(str(img)+'\n')
                        info.write("----------------------------------------------------------------")


        except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
        finally:
                continue
        
url_list.close()
