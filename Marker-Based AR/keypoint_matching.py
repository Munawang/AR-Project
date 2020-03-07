import cv2
import numpy as np
import random
import os
#from time import process_time

# Don't forget to resize images before processing (size < 2000)
original = cv2.imread("")
image_to_compare = cv2.imread("")

#t1_start = process_time()  

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
    if m.distance < 0.5*n.distance:
        matchesMask[i]=[1,0]
        good_points.append(m)

# Define how similar they are
number_keypoints = 0
if len(kp_1) <= len(kp_2):
    number_keypoints = len(kp_1)
else:
    number_keypoints = len(kp_2)
    
percentSimilar = (len(good_points) / number_keypoints)* 100

#t1_stop = process_time()

draw_params = dict(matchColor = (0,255,0),
                singlePointColor = (0,0,255), # b,g,r
                matchesMask = matchesMask,
                flags = 0)

print("Keypoints 1ST Image: " + str(len(kp_1)))
print("Keypoints 2ND Image: " + str(len(kp_2)))
print("GOOD Matches:", len(good_points))
print("Similarity: ", (len(good_points) / number_keypoints)* 100)

result = cv2.drawMatchesKnn(original, kp_1, image_to_compare, kp_2, matches, None, **draw_params)
cv2.imshow("result", cv2.resize(result, None, fx=0.4, fy=0.4))

#print("Time to process:", t1_stop-t1_start, "seconds")


cv2.waitKey(0)
cv2.destroyAllWindows()