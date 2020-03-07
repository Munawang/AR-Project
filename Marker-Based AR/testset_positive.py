import cv2
import numpy as np
from requests.exceptions import HTTPError
import json
import random
import os

testset = open('positive_list.txt', 'r', encoding="utf-8")
count = 0

for ts in testset:
        count += 1
        
txtfile = open("result_positive.txt","a+") #change
txtfile.write("\n" + "FRONT-FAR" +"\n") #change

testset.seek(0,0)
for num in range(count):
        response = testset.readline()
        pictest = response.replace(" ","").strip("\n")
        picFront = "testset/positive/"+pictest+"_front.jpg"
        picOther = "testset/positive/"+pictest+"_far.jpg" #change

        # Don't forget to resize images before processing (size < 2000)
        original = cv2.imread(picFront)
        image_to_compare = cv2.imread(picOther)

        # 1) Check if 2 images are equals
        if original.shape == image_to_compare.shape:
            print("same size and channels")
            difference = cv2.subtract(original, image_to_compare)
            b, g, r = cv2.split(difference)

            if cv2.countNonZero(b) == 0 and cv2.countNonZero(g) == 0 and cv2.countNonZero(r) == 0:
                print("same pixel value")
            else:
                print("different pixel value")
        else:
            print("different size and channels")

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
            if m.distance < 0.5*n.distance: #distance value
                matchesMask[i]=[1,0]
                good_points.append(m)

        # Define how similar they are
        number_keypoints = 0
        if len(kp_1) <= len(kp_2):
            number_keypoints = len(kp_1)
        else:
            number_keypoints = len(kp_2)
            
        percentSimilar = (len(good_points) / number_keypoints)* 100
        
        
        txtfile.write("%d. %s: %d / %d / %d / %f \n" % (num+1,pictest,len(kp_1),len(kp_2),len(good_points),percentSimilar))

txtfile.close()
testset.close()