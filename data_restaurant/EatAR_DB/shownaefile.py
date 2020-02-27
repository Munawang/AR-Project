f = open('nameplace.txt' ,encoding="utf-8")
while True:
    data = f.readline()
    print(data)
    if not data:
        break
f.close()
