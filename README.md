基于TensorFlow,TensorFlow Servering 和 Flask 的图像检索系统。
==================================================================

## 1. 首先是抽取特征[extract_feature](https://github.com/icodingc/image-retrieval-demo/tree/master/extract_feature)
## 2. 运行服务[tensorflow_serving](https://github.com/icodingc/image-retrieval-demo/tree/master/tensorflow_serving) <br\>

- 因为Tensorflow serving 更新版本导致本项目暂时不能使用(不过最新版本的Serving更容易学习，前段时间写了下新版本的还未来得及上传）
- 可以如感兴趣可以看下我的其他例子[client](https://github.com/icodingc/dssm-slim/blob/master/deploy/tf_client/vgg_client.py)和[exporter](https://github.com/icodingc/dssm-slim/blob/master/deploy/tf_server/vgg_export_serving.py)以及[server](https://github.com/icodingc/dssm-slim/blob/master/deploy/tf_server/run_server.sh)

## 3. 一个[web_demo](https://github.com/icodingc/image-retrieval-demo/tree/master/visualsearch)修改自[VisualSearch](https://github.com/AKSHAYUBHAT/VisualSearchServer)
几个检索实例
![](https://github.com/icodingc/image-retrieval-demo/blob/master/examples/eg1.png)
![](https://github.com/icodingc/image-retrieval-demo/blob/master/examples/eg2.png)
## Future
- 抽出的特征不返回client,直接在server 上计算knn。
- 在web demo 界面上显示label。
