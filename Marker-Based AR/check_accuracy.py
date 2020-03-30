import json
import os


txtfile = open("count0.86.txt","a+") #change
percent = 10;

while percent <= 100:
    result = open('result0.86.txt', 'r', encoding="utf-8") #change
    txtfile.write("\n -- %d -- \n" % percent)
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
            
            if len(listResult) == 10: #len of positive set = 10 and negative = 12
                if float(listResult[8]) >= percent:
                    count += 1
                    TP += 1
                else:
                    FN += 1
            else:
                if float(listResult[10]) >=  percent:
                    count += 1
                    FP += 1
                else:
                    TN += 1
    percent += 5;
    
    p_count = (count/104)*100
    p_tp = (TP/24)*100 
    p_fn = (FN/24)*100 
    p_fp = (FP/80)*100 
    p_tn = (TN/80)*100 
    txtfile.write("Accuracy: %d / 104 = %.2f \n" % (count,p_count))
    txtfile.write("TP: %d / FN: %d / FP: %d / TN: %d \n" % (TP,FN,FP,TN))
    txtfile.write("TP: %.2f / FN: %.2f / FP: %.2f / TN: %.2f \n" % (p_tp,p_fn,p_fp,p_tn))
    txtfile.write("---------------------------------------\n")

txtfile.close()
result.close()