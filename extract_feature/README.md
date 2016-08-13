抽取特征
===========
#这里主要完成的任务是抽取特征包括
    - 抽取整个数据集的特征
    - 抽取用户上传图片的特征
#本项目的模型采用的是[inception](https://github.com/tensorflow/models/tree/master/inception)

抽取给定数据集特征
-------------------
1. 抽取特征主要会用到文件[inception_extract](https://github.com/icodingc/image-retrieval-demo/blob/master/extract_feature/inception/inception_extract.py),修改自参考项目的[inception_eval](https://github.com/tensorflow/models/blob/master/inception/inception/imagenet_eval.py)代码。主要修改几点
```Python
# 抽取出特征需要和图片文件名字对应，因此需要文件名
images,labels,filenames_op = image_processing.inputs(dataset)
#在这里需要返回endpoints,因为我们需要的是中间层特征而不是logits
#需要指出的是inference 函数也做啦微小改动用于返回 endpoints
#可以详细看 inception_model.py 文件了解
_, _, endpoints = inception.inference(images,num_clases)
```
2. 最后我们抽取的特征是endpoints['mixed_8x8x2048b']，然后用avg_pooling操作把8x8x2048 的特征转换为2048的向量。
3. 至于怎么生成数据主要用[build_image_data](https://github.com/icodingc/image-retrieval-demo/blob/master/extract_feature/inception/data/build_image_data.py)文件，然后修改flowers_data.py 文件。
4. 完成以上步骤就可以运行extract.sh 文件修改下参数抽取特征啦。
