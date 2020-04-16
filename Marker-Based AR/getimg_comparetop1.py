from firebase import firebase
from requests.exceptions import HTTPError
import cv2
import numpy as np
import urllib.request
import os
from collections import Counter 
from time import process_time

t1_start = process_time()

#SET PART
zoneId = "zone01"
nameRest = "keki"
perspective = "other01"

if zoneId == "zone01":
    zonename = "keki"
    numRest = 11
elif zoneId == "zone02":
    zonename = "jinda"
    numRest = 10
elif zoneId == "zone03":
    zonename = "fbt"
    numRest = 10
    
countTop = 0

# Prepare for write data in txtfile
txtfile = open("compare"+nameRest+"_"+perspective+".txt","a+")
txtfile.write("- %s : %s -\n" % (zoneId,perspective))
checkDict = {}

# 1) Get the image URLs from Firebase
firebase = firebase.FirebaseApplication("https://eatarproject.firebaseio.com/", None)
for restNo in range(1, numRest+1):
    if restNo < 10:
        checkNum = '0'
    else:
        checkNum = ""
    
    def url_to_image(urlImg):
        resp = urllib.request.urlopen(urlImg)
        image = np.asarray(bytearray(resp.read()), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        return image

    urlImg = firebase.get('/restaurant/'+zoneId+'/'+zonename+checkNum+str(restNo)+'/res_marker', '')
    pathImg = "testset/negative_compare/"+nameRest+"_"+perspective+".jpg"
    original = url_to_image(urlImg)
    image_to_compare = cv2.imread(pathImg)

    # 2) Check for similarities between the 2 images
    sift = cv2.xfeatures2d.SIFT_create()

    kp_1, desc_1 = sift.detectAndCompute(original, None)
    kp_2, desc_2 = sift.detectAndCompute(image_to_compare, None)

    FLANN_INDEX_KDTREE = 0
    index_params = dict(algorithm = FLANN_INDEX_KDTREE, trees = 5)
    search_params = dict()

    flann = cv2.FlannBasedMatcher(index_params, search_params)

    matches = flann.knnMatch(desc_1, desc_2, k=2)

    # Need to draw only good matches, so create a mask
    matchesMask = [[0,0] for i in range(len(matches))]

    # ratio test as per Lowe's paper
    good_points = []
    for i,(m,n) in enumerate(matches):
        if m.distance < 0.85*n.distance:
            matchesMask[i]=[1,0]
            good_points.append(m)

    # Define how similar they are
    number_keypoints = 0
    if len(kp_1) <= len(kp_2):
        number_keypoints = len(kp_1)
    else:
        number_keypoints = len(kp_2) 
        
    percentSimilar = (len(good_points) / number_keypoints)*100
    if (percentSimilar >= 10 and percentSimilar > countTop):
        nameCheck = zonename+checkNum+str(restNo)
        countTop = percentSimilar
    else:
        nameCheck = "Not Found"
    
    txtfile.write("%d. %d / %d / %d / %f \n" % (restNo,len(kp_1),len(kp_2),len(good_points),percentSimilar))

txtfile.write("\n-----------------------------------------\n")
txtfile.write("%s : %f \n" % (nameCheck, countTop))

if perspective[0:5] == "other": #NegativeSet
    if countTop < 10:
        result = "Positive TN"
    else:
        result = "Negative FP"

else: #PositiveSet
    if countTop >= 10:
        result = "Positive TP"
    else:
        result = "Negative FN"
    
txtfile.write(result)
t1_stop = process_time()

txtfile.write("\nTime to process: %f seconds" % (t1_stop-t1_start))
txtfile.close()
cv2.waitKey(0)
cv2.destroyAllWindows()