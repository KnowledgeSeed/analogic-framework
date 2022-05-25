import sys
from os.path import exists
import os
from analogic_pool import insert_key

if len(sys.argv) < 2:
    print('Please add applicationName as 1st argument')
    print('setup_iis.py applicationName')
    exit(0)

if exists('secret_key') is False:
    print('Please run setup.py first')
    exit(0)

secret_file = open("secret_key", "r")
secret_key = secret_file.read()
secret_file.close()
os.remove('secret_key')

application = sys.argv[1]

insert_key(application, secret_key)


