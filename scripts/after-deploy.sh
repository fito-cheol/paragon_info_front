#!/bin/bash

REPOSITORY=/home/ubuntu/frontServer

cd $REPOSITORY

pm2 desc front_server > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start build/server.js --name front_server
else
  pm2 restart front_server
fi;