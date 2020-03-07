import cv2
import numpy as np
from requests.exceptions import HTTPError
import json
import random
import os
        
txtfile = open("result0.6_negative.txt","a+") #change
txtfile.write("\n" + "FRONT-FAR" +"\n") #change

path1 = r"C:\Users\Supapitch\Desktop\detect_how_similar_images_are\testset\negative\front"
path2 = r"C:\Users\Supapitch\Desktop\detect_how_similar_images_are\testset\negative\far" #change

for num in range(2):
    random1 = random.choice([
        x for x in os.listdir(path1)
        if os.path.isfile(os.path.join(path1, x))
    ])
    
    random2 = random.choice([
        y for y in os.listdir(path2)
        if os.path.isfile(os.path.join(path2, y))
    ])
    
    random_front = random1.strip("\n")
    random_other = random2.strip("\n")
    
    stripfront = random1.strip(".jpg")
    stripother = random2.strip(".jpg")
    frontName = stripfront.split("_")
    otherName = stripother.split("_")

    # Don't forget to resize images before processing (size < 2000)
    original = cv2.imread("testset/negative/front/"+random_front)
    image_to_compare = cv2.imread("testset/negative/far/"+random_other) #change

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
        if m.distance < 0.6*n.distance: #distance value
            matchesMask[i]=[1,0]
            good_points.append(m)

    # Define how similar they are
    number_keypoints = 0
    if len(kp_1) <= len(kp_2):
        number_keypoints = len(kp_1)
    else:
        number_keypoints = len(kp_2)
        
    percentSimilar = (len(good_points) / number_keypoints)* 100
    
    
    txtfile.write("%d. %s - %s: %d / %d / %d / %f \n" % (num+1,frontName[0],otherName[0],len(kp_1),len(kp_2),len(good_points),percentSimilar))

txtfile.close()