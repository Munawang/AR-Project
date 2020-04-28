import cv2
import numpy as np
import urllib.request
from collections import Counter 
import time

#Get From AR 
zoneId = "zone01"

if zoneId == "zone01":
    zonename = "keki"
    numRest = 11
elif zoneId == "zone02":
    zonename = "jinda"
    numRest = 10
elif zoneId == "zone03":
    zonename = "fbt"
    numRest = 10
    
# 1) Get images from webcam and Firebase
img_counter = 0
check = 1 

def timeCounter():
    from firebase import firebase
    from requests.exceptions import HTTPError
    countTop = 0

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
        ori = url_to_image(urlImg)
        original = cv2.resize(ori,(500,750))
                    
        # 2) Check for similarities between the 2 images
        time.sleep(5)
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

        print("%d. %d / %d / %d / %f " % (restNo,len(kp_1),len(kp_2),len(good_points),percentSimilar))

    print("%s : %f \n" % (nameCheck, countTop))

while True:
    cam = cv2.VideoCapture(0)
    ret, frame = cam.read()
    flipFrame = cv2.flip(frame, 1)
    image_to_compare = cv2.resize(flipFrame,(500,750))
    cv2.imshow("camera", image_to_compare)
    k = cv2.waitKey(1)
    img_counter = 0

    if k%256 == 27: # ESC pressed
        check = 2
        break
    if check == 1 :
        timeCounter()

cam.release()
cv2.waitKey(0)
cv2.destroyAllWindows()