#!/bin/bash

REPOSITORY=/home/ubuntu/paragonServer

cd $REPOSITORY

PROCESSNAME=ParagonServer

pm2 desc PROCESSNAME > /dev/null
RUNNING=$?

# if [ "${RUNNING}" -ne 0 ]; then
#   pm2 start build/server.js --name PROCESSNAME
# else
#   pm2 restart PROCESSNAME
# fi;

if [ "${RUNNING}" -ne 0 ]; then
  pm2 restart $PROCESSNAME
else
  npm run pm2:pro
fi;


