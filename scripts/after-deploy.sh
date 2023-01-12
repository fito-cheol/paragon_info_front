#!/bin/bash

REPOSITORY=/home/ubuntu/paragonServer

cd $REPOSITORY

PROCESSNAME=ParagonServer

pm2 desc PROCESSNAME > /dev/null
RUNNING=$?


if [ "${RUNNING}" -ne 0 ]; then
  npm run pm2:pro
else
  pm2 restart $PROCESSNAME
fi;


