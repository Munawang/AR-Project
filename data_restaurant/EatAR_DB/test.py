jinda = open('C://Users//Munawang//Desktop//dataplace//Jinda_nameplace.txt' ,encoding="utf-8")
fbt = open('C://Users//Munawang//Desktop//dataplace//FBT_nameplace.txt' ,encoding="utf-8")
keki = open('C://Users//Munawang//Desktop//dataplace//Keki_nameplace.txt' ,encoding="utf-8")
while True:
    file_jinda = jinda.readline()
    file_fbt = fbt.readline()
    file_keki = keki.readline()
    print(file_jinda)
    print(file_fbt)
    print(file_keki)
    #if not data:
        #break
f.close()