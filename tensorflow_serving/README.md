这里主要用tensorflow_serving 提供稳定服务
==============================================

服务器端
--------------
## 对于tensorflow_serving 中的例子做了一些修改[inception_inference](https://github.com/icodingc/image-retrieval-demo/blob/master/tensorflow_serving/inception_inference.cc)
#### 因为原始例子中的inference 是生成预测概率值，而我们想要得到的数据哦2048-d的特征，
```C++
    for (int j = 0; j < kNumTopClasses; j++) {
      *classes->Add() = batched_classes.matrix<string>()(i, j);
    }
    for (int j = 0; j < 2048; j++) {
      scores->Add(batched_scores.matrix<float>()(i, j));
    }
//    for (int j = 0; j < kNumTopClasses; j++) {
//      *classes->Add() = batched_classes.matrix<string>()(i, j);
//      scores->Add(batched_scores.matrix<float>()(i, j));
//    }
```
#### 我们只稍微修改inception_inference.cc代码即可，准则就是返回的scores要有2048个，上边代码中的注释是原始文件，很好理解。
#### 修改好后就可以通过
```
bazel build inception_inference
```
编译生成可执行文件啦。
```shell
# 运行程序需要指定端口号，和exported model
"Usage: inception_inference --port=9000 /path/to/exports";
```
#### 一个运行例子![](https://github.com/icodingc/image-retrieval-demo/blob/master/tensorflow_serving/picture/rpc_server.png)
客户端
-------------
client 很简单只需要几行[inception_client](https://github.com/icodingc/image-retrieval-demo/blob/master/tensorflow_serving/inception_client.py)
#### 一个运行例子，传入的图片是./picture/01018723.jpg,一张衣服图片![](https://github.com/icodingc/image-retrieval-demo/blob/master/tensorflow_serving/picture/client.png)
