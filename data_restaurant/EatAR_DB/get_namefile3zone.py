f = open('nameplace.txt' ,encoding="utf-8")

#------- Get nameRes FBT Zone ---------
#f = open('C://Users//Munawang//Desktop//dataplace//FBT_nameplace.txt' ,encoding="utf-8")
#------- Get nameRes Jinda Zone ---------
#f = open('C://Users//Munawang//Desktop//dataplace//Jinda_nameplace.txt' ,encoding="utf-8")
#------- Get nameRes Keki Zone ---------
#f = open('C://Users//Munawang//Desktop//dataplace//Keki_nameplace.txt' ,encoding="utf-8")

while True:
    data = f.readline()
    print(data)
    if not data:
        break
f.close()
