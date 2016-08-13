#!/usr/bin/env python
from flask import render_template, redirect, request, abort,jsonify
import base64
from PIL import Image
from io import BytesIO
root_name = '/home/zhangxs/serving/project_0810'
# inception client
from grpc.beta import implementations
import tensorflow as tf
import numpy as np
import os,sys,time
sys.path.append(os.path.join(os.path.dirname(__file__),"../../../"))
from tensorflow_serving.example import inception_inference_pb2
channel = implementations.insecure_channel('localhost',int(9000))
stub = inception_inference_pb2.beta_create_InceptionService_stub(channel)
# client end
# for annoy
from annoy import AnnoyIndex
t = AnnoyIndex(2048)
t.load(root_name + '/test.ann')
with open(root_name + '/names.lst','r') as f:lst = f.readlines()
# end

def index():
    return render_template('index.html')

def home():
    payload = {'gae_mode':False}
    return render_template('editor.html',payload = payload)

def search():
    image_url = request.form['image_url']
    image_data = base64.decodestring(image_url[22:])
#    start = time.time()
    with open('temp.png','wb') as f:f.write(image_data)
    im = Image.open('temp.png').resize((256,256)).save('temp.jpg','JPEG')
    with open('temp.jpg','rb') as f:my_data = f.read()
#    mid = time.time()
#    print "load image ...",mid - start
    request_ = inception_inference_pb2.InceptionRequest()
    request_.jpeg_encoded = my_data
    result = stub.Classify(request_,10.0)
#    mid2 = time.time()
#    print "extract feature ...",mid2 - mid
    feat  = np.array(result.scores)
    for a in result.classes:print a
    idx = t.get_nns_by_vector(feat,12)
#    print "annoy time...",time.time() - mid2
    results = [lst[i].strip() for i in idx]
    return jsonify(results = results)

def search_quick():
    return search()

def add_views(app):
    app.add_url_rule('/test',view_func=index)
    app.add_url_rule('/',view_func=home)
    app.add_url_rule('/Search',view_func=search,methods=['POST'])
    app.add_url_rule('/Quick',view_func=search_quick,methods=['POST'])


