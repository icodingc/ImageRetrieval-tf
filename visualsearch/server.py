import os,sys,logging
sys.path.insert(1, os.path.join(os.path.abspath('.'), ''))
from appcode import app
if __name__ == '__main__':
    app.run(host="0.0.0.0",port=7004,debug=False)
