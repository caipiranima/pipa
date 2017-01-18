import cv2
import numpy as np

img = cv2.imread('animabic.jpg')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.bilateralFilter(gray, 11, 17, 17)
edged = cv2.Canny(gray, 30, 200)

(_, cnts, _) = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

# convert the image to grayscale, blur it, and find edges
# in the image
#gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#gray = cv2.bilateralFilter(gray, 11, 17, 17)
#edged = cv2.Canny(gray, 30, 200)

# find contours in the edged image, keep only the largest
# ones, and initialize our screen contour
#(_, cnts, _) = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
#
#for i in range(1000):
    #img = cv2.drawContours(img, cnts, i, (255, 0, 0), 1, 8)

    # x,y,w,h  = cv2.boundingRect(cnts[i])
    # img = cv2.rectangle(img, (x,y), (x+w, y+h), (0, 255, 0), 2, 8, 0)

    # minRect = cv2.minAreaRect(cnts[i])
    # box = cv2.boxPoints(minRect)
    # box = np.int0(box)
    # cv2.drawContours(img, [box], 0, (0,0,255), 1, 8)

cv2.imshow('image', gray)
cv2.waitKey(0)
cv2.destroyAllWindows()

# X_INIT = 838
# Y_INIT = 1405
# WIDTH = 470
# HEIGHT = 340
# BORDER = 27.5
# GUTTER = 472
#
# for i in range(297):
#     X = X_INIT + np.floor(i/33)*(WIDTH+GUTTER+1.65*BORDER) # o ideal é 2* ao invés de 1.65*. Se o papel estiver alinhado deve resolver.
#     Y = Y_INIT + (i%33)*(HEIGHT+BORDER) + np.floor(i/33)*2 # a última adição math.floor(i/33)*2 não seria necessária se a folha estivesse alinhada.
#     img_crop = img[Y:Y+HEIGHT, X:X+WIDTH]
#     cv2.imwrite('out/out'+str(i).zfill(3)+'.png', img_crop)
