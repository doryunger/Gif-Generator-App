from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.http import HttpResponse
from django.shortcuts import render
import requests
import os
import io
import base64
from cv2 import cv2
from django.http import HttpResponse




#Rendering the homepage (from React's build directory)
def index(request):
    return render(request, "build/index.html")

#Setting up a post request for the API
@api_view(['POST'])
def generator(request):
    #Creates a 'video' object that stores a binary representation of the video file
    vid=request.FILES['file'].file.read()
    #Populates a dictionary with the video's data 
    data = {'filename':request.FILES['file'].name}
    file = {'file': vid}
    f=open(request.FILES['file'].name,'wb')
    f.write(vid)
    f.close()
    #Checks the dimensions of the video file
    cap = cv2.VideoCapture(request.FILES['file'].name)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    os.remove(request.FILES['file'].name)
    #If the video's dimensions are too big or small the server returns a '500' response
    if width<120 or height<120:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data="File Error - Too Small")
    elif width>1300 or height>1300:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data="File Error - Too Big")
    #If there's no error, a request is made for the API
    else:
        url= "https://doryunger.com/gifgen"
        res = requests.post(url, files=file,data=data)
        #Once data returns it got stored and encoded as base64 object
        content = res.content
        newbase=base64.b64encode(content)
        return HttpResponse(newbase, content_type='application/octet-stream')


