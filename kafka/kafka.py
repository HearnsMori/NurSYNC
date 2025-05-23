# Importing required module
import subprocess

# execute shell commands
subprocess.Popen('cd ./kafka_2.13-3.9.1 && bin/kafka-server-start.sh config/server.properties',shell=True)
print('kafka running')
