# Importing required module
import subprocess

# execute shell commands
subprocess.Popen('cd ./kafka_2.13-3.9.1 && sh bin/zookeeper-server-start.sh config/zookeeper.properties', shell=True)
print('zookeeper running')
