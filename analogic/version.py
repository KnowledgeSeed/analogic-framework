import os

dir_path = os.path.dirname(os.path.realpath(__file__))
f = open(dir_path + "/version.config")
version = f.read().rstrip()
print("Analogic framework version: " + version)
