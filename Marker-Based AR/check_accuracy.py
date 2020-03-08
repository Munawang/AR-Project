import json
import os


txtfile = open("result0.6.txt","a+") #change

for i in range(9):
    result = open('list_0.6.txt', 'r', encoding="utf-8") #change
    percent = [5,10,15,20,25,30,35,40,45,50]
    txtfile.write("\n -- %d -- \n" % percent[i])
    num = 0
    TP = 0
    TN = 0
    FP = 0
    FN = 0
    count = 0

    for r in result:
            num += 1
    print(num) 
    result.seek(0,0)
    
    for j in range(num):
            response = result.readline()
            resultStrip = response.strip("\n")
            listResult= resultStrip.split(" ")
            
            if len(listResult) == 10: 
                if float(listResult[8]) >= percent[i] and float(listResult[8]) < percent[i+1]:
                    count += 1
                    TP += 1
                else:
                    TN += 1
            else:
                if float(listResult[10]) >=  percent[i]and float(listResult[10]) < percent[i+1]:
                    count += 1
                    FP += 1
                else:
                    FN += 1
    
    txtfile.write("Accuracy: %d / 104 \n" % count)
    txtfile.write("TP: %d / TN: %d / FP: %d / FN: %d \n" % (TP,TN,FP,FN))
    txtfile.write("---------------------------------------\n")

txtfile.close()
result.close()