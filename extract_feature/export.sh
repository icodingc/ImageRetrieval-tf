NOWDIR=`dirname "$0"`
NOWDIR=`cd $NOWDIR; pwd`
export PYTHONPATH=/home/zhangxs/serving/models/inception/
python $NOWDIR/inception/inception_export2.py \
  --checkpoint_dir=./models-v3/ \
  --image_size=299 \
  --export_dir=$NOWDIR/exported_feature \
