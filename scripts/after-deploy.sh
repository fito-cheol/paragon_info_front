#!/bin/bash

REPOSITORY=/home/ubuntu/frontServer

cd $REPOSITORY

pm2 desc front_server > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 serve build/ 3000 --name front_server
fi;