from firebase import firebase
import cv2
import numpy as np
import urllib.request
import os
from time import process_time

t1_start = process_time()
checkSimilar = 0
nameSimilar = "ไม่พบข้อมูลร้าน"

#01keki/02jinda/03fbt
zoneId = "zone03" #change
if zoneId == "zone01":
    zonename = "keki"
    numRest = 11
elif zoneId == "zone02":
    zonename = "jinda"
    numRest = 10
else:
    zonename = "fbt"
    numRest = 10

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
    original = url_to_image(urlImg)
    image_to_compare = cv2.imread("images/imgtest_fbt.jpg") #change

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
        
    percentSimilar = (len(good_points) / number_keypoints)* 100
    if (percentSimilar >= 10) and (percentSimilar >= checkSimilar):
        checkSimilar = percentSimilar
        nameSimilar = zonename+checkNum+str(restNo)
    
    print("%d. : %d / %d / %d / %f" % (restNo,len(kp_1),len(kp_2),len(good_points),percentSimilar))

print("\n-----------------------------------------\n")
print(nameSimilar)
print(checkNum)

t1_stop = process_time()
print("Time to process:", t1_stop-t1_start, "seconds")

cv2.waitKey(0)
cv2.destroyAllWindows()