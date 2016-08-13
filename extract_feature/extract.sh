NOWDIR=`dirname "$0"`
NOWDIR=`cd $NOWDIR; pwd`
export PYTHONPATH=/home/zhangxs/serving/models/inception/
python $NOWDIR/inception/flowers_extract.py \
  --checkpoint_dir=./models-v3/ \
  --image_size=299 \
  --data_dir=/home/zhangxs/data/test_grpc/tfrecord/train \
  --eval_dir=$NOWDIR/evaluation \
  --batch_size=100 \
  --num_examples=28400 \
  --num_preprocess_threads=4 \
  --num_readers=1 \
  --input_queue_memory_factor=1 \
