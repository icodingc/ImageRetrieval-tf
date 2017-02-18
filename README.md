基于[TensorFlow](https://www.tensorflow.org/)以及[TF-serving](http://tensorflow.github.io/serving/)图像检索
==================================================================

## 1. 抽取特征[extract_feature](https://github.com/icodingc/image-retrieval-demo/tree/master/extract_feature) <br\>

- 这里没有训练网络，只是根据ImageNet上预训练Inception_v3模型抽取mixed_8x8x2048b层特征，然后sum_pooling到2048-d。
- 如想得到更好的特征表示，可以参考DeepRank等文章根据数据集fine-tune训练网络。

## 2. 运行服务[Serving](https://github.com/icodingc/image-retrieval-demo/tree/master/tensorflow_serving) <br\>

- 因为Tensorflow Serving 更新版本导致本项目不能使用。
- 不过最新版本的Serving更容易学习使用，如感兴趣可以看下我写的其他例子[client](https://github.com/icodingc/dssm-slim/blob/master/deploy/tf_client/vgg_client.py)和[exporter](https://github.com/icodingc/dssm-slim/blob/master/deploy/tf_server/vgg_export_serving.py)以及[server](https://github.com/icodingc/dssm-slim/blob/master/deploy/tf_server/run_server.sh)

## 3. 一个[web_demo基于Flask](https://github.com/icodingc/image-retrieval-demo/tree/master/visualsearch)修改自[VisualSearch](https://github.com/AKSHAYUBHAT/VisualSearchServer)


下边是几个检索例子
![](https://raw.githubusercontent.com/icodingc/ImageRetrieval-tf/master/examples/eg1.png)
![](https://raw.githubusercontent.com/icodingc/ImageRetrieval-tf/master/examples/eg2.png)
