Annoy + Flask
=================
[Annoy](https://github.com/spotify/annoy)
-------
Annoy 是一个非常好用的近邻搜索库
```Python
from annoy import AnnoyIndex

f = 40       # dim of the feature
t = AnnoyIndex(f)
# 1000,代表一共有1000个实例
# FEATURE(i),代表第i个实例的特征
for i in xrange(1000):
    v = FEATURE(i)
    t.add_item(i, v)

t.build(10) # 10 trees
t.save('test.ann')
# ...use..
u = AnnoyIndex(f)
u.load('test.ann') # super fast, will just mmap the file
print(u.get_nns_by_vector(FEATURE(0), 10)) # will find the 1000 nearest neighbors
```

[Flask](http://flask.pocoo.org/)
-----------
Flask 是一个python web 框架，在这里直接用了别人模板。

整个服务的核心就在[view.py](https://github.com/icodingc/image-retrieval-demo/blob/master/visualsearch/appcode/view.py)

:)
